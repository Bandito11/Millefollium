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
  @State() inputs: HTMLElement[];
  @Prop() ingredients: IIngredient[];
  data: IIngredient[];

  componentWillLoad() {
    this.inputs = [];
    if (!this.ingredients) {
      this.inputs = [...this.inputs, this.addIngredientInput(0)];
      this.data = [
        {
          name: null,
          amount: null,
        },
      ];
    } else {
      this.data = [...this.ingredients];
      this.data.map(
        (ingredient, i) =>
          (this.inputs = [
            ...this.inputs,
            this.addIngredientInput(i, ingredient),
          ])
      );
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
          <ion-label position="fixed">Amount</ion-label>
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
    this.data[arg0.index][arg0.control] = arg0.event.target['value'];
    this.ingredientsInputData.emit(this.data);
  }

  addNewInput(index) {
    this.inputs = [...this.inputs, this.addIngredientInput(index)];
    this.data.push({
      name: null,
      amount: null,
    });
  }

  removeFromIngredientInputs(): void {
    this.inputs.pop();
    this.inputs = [...this.inputs];
    this.data.pop();
  }
  render() {
    return (
      <Host>
        <ion-list>
          <ion-list-header>
            <ion-label>Ingredients</ion-label>
          </ion-list-header>
          {this.inputs.map((ingredientControl) => ingredientControl)}
          <ion-item lines="none">
            <ion-button onClick={() => this.addNewInput(this.inputs.length)}>
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
