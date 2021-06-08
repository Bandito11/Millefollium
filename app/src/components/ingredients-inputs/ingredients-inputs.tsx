import {
  Component,
  Host,
  h,
  Event,
  EventEmitter,
  State,
  Prop,
} from '@stencil/core';
import { IIngredient } from '../../interfaces/IIngredient';

@Component({
  tag: 'ingredients-inputs',
  styleUrl: 'ingredients-inputs.css',
})
export class IngredientsInputs {
  @State() ingredientsInputs: HTMLElement[];
  @Prop() ingredients: IIngredient[];

  componentWillLoad() {
    this.ingredientsInputs = [this.addIngredientInput(0)];
    if (!this.ingredients) {
      this.ingredients = [
        {
          name: null,
          amount: null,
        },
      ];
    }
  }

  @Event() ingredientsInputData: EventEmitter<IIngredient[]>;

  addIngredientInput(index, ingredient?: IIngredient) {
    return (
      <div class="ion-padding">
        <p class="ingredients-text">{index + 1}</p>
        <ion-item>
          <ion-label position="fixed">Name</ion-label>
          <ion-input
            id={`ingredient-name-id-${index}`}
            required={true}
            value={ingredient?.name}
            onInput={(event) =>
              this.handleInput({ index: index, event: event, control: 'name' })
            }
          />
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Amount (g)</ion-label>
          <ion-input
            id={index}
            required={true}
            value={ingredient?.amount}
            onInput={(event) =>
              this.handleInput({
                index: index,
                event: event,
                control: 'amount',
              })
            }
          />
        </ion-item>
      </div>
    );
  }
  handleInput(arg0: { index: any; event: Event; control: string }): void {
    this.ingredients[arg0.index][arg0.control] = arg0.event.target['value'];
    this.ingredientsInputData.emit(this.ingredients);
  }

  addToIngredientInputs(index) {
    this.ingredientsInputs = [
      ...this.ingredientsInputs,
      this.addIngredientInput(index),
    ];
    this.ingredients.push({
      name: null,
      amount: null,
    });
  }

  removeFromIngredientInputs(): void {
    this.ingredientsInputs.pop();
    this.ingredientsInputs = [...this.ingredientsInputs];
    this.ingredients.pop();
  }
  render() {
    return (
      <Host>
        <ion-list>
          <ion-list-header>
            <ion-label>Ingredients</ion-label>
          </ion-list-header>
          {this.ingredientsInputs.map((ingredientControl) => ingredientControl)}
          <ion-item>
            <ion-button
              onClick={() =>
                this.addToIngredientInputs(this.ingredientsInputs.length)
              }
            >
              Add Ingredient
            </ion-button>
            <ion-button
              color="secondary"
              onClick={() => this.removeFromIngredientInputs()}
            >
              Remove Ingredient
            </ion-button>
          </ion-item>
        </ion-list>
      </Host>
    );
  }
}
