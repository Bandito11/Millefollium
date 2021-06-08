import { SelectChangeEventDetail } from '@ionic/core';
import { Component, Host, h, Event, EventEmitter, Prop } from '@stencil/core';
import { categories } from '../../helpers/constants';
import { capitalizeFirstLetter } from '../../helpers/utils';
import { IRecipeInputs } from '../../interfaces/IRecipeInputs';

@Component({
  tag: 'recipe-inputs',
  styleUrl: 'recipe-inputs.css',
})
export class RecipeInputs implements IRecipeInputs {
  @Prop() name: string;
  // @Prop() calories: number;
  // @Prop() carbs: number;
  // @Prop() protein: number;
  // @Prop() fat: number;
  @Prop() category: string;
  recipeInput: IRecipeInputs;

  @Event() recipeInputData: EventEmitter<IRecipeInputs>;

  componentWillLoad() {
    if (this.name) {
      this.recipeInput = {
        name: this.name,
        // calories: this.calories,
        // carbs: this.carbs,
        // protein: this.protein,
        // fat: this.fat,
        category: this.category,
      };
    } else {
      this.recipeInput = {
        name: null,
        // calories: 0,
        // carbs: 0,
        // protein: 0,
        // fat: 0,
        category: null,
      };
    }
  }

  handleSelect = (event: CustomEvent<SelectChangeEventDetail<any>>) => {
    this.recipeInput = {
      ...this.recipeInput,
      category: event.target['value'],
    };
    this.recipeInputData.emit(this.recipeInput);
  };
  handleChange(arg0: { control: string; event: Event }): void {
    this.recipeInput = {
      ...this.recipeInput,
      [arg0.control]: arg0.event.target['value'],
    };
    this.recipeInputData.emit(this.recipeInput);
  }

  render() {
    return (
      <Host>
        <ion-item>
          <ion-label position="fixed">
            Name <ion-text color="danger">*</ion-text>
          </ion-label>
          <ion-input
            required
            type="text"
            value={this.name}
            onInput={(event) =>
              this.handleChange({ control: 'name', event: event })
            }
          />
        </ion-item>
        {/* <ion-item>
          <ion-label position="fixed">
            Calories <ion-text color="danger">*</ion-text>
          </ion-label>
          <ion-input
            disabled
            type="text"
            value={this.calories}
            onInput={(event) =>
              this.handleChange({ control: 'calories', event: event })
            }
          />
        </ion-item> */}
        <ion-item>
          <ion-label>Category</ion-label>
          <ion-select
            placeholder="Breakfast"
            onIonChange={this.handleSelect}
            value={this.category}
          >
            {categories.map((category) => (
              <ion-select-option value={category}>
                {capitalizeFirstLetter(category)}
              </ion-select-option>
            ))}
          </ion-select>
        </ion-item>
        {/* <ion-item>
          <ion-label position="fixed">
            Carbs (g) <ion-text color="danger">*</ion-text>
          </ion-label>
          <ion-input
            disabled
            type="text"
            value={this.carbs}
            onInput={(event) =>
              this.handleChange({ control: 'carbs', event: event })
            }
          />
        </ion-item> */}
        {/* <ion-item>
          <ion-label position="fixed">
            Protein (g) <ion-text color="danger">*</ion-text>
          </ion-label>
          <ion-input
            disabled
            type="text"
            value={this.protein}
            onInput={(event) =>
              this.handleChange({ control: 'protein', event: event })
            }
          />
        </ion-item> */}
        {/* <ion-item>
          <ion-label position="fixed">
            Fat (g) <ion-text color="danger">*</ion-text>
          </ion-label>
          <ion-input
            disabled
            type="text"
            value={this.fat}
            onInput={(event) =>
              this.handleChange({ control: 'fat', event: event })
            }
          />
        </ion-item> */}
      </Host>
    );
  }
}
