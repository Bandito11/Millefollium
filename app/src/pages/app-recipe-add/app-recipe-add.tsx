import { toastController } from '@ionic/core';
import { Component, Host, h, Listen } from '@stencil/core';
import { IIngredient } from '../../interfaces/IIngredient';
import { IRecipe } from '../../interfaces/IRecipe';
import { IRecipeInputs } from '../../interfaces/IRecipeInputs';
import { addRecipe } from '../../services/recipe';

@Component({
  tag: 'app-recipe-add',
  styleUrl: 'app-recipe-add.css',
})
export class AppRecipeAdd {
  recipe: IRecipe;

  componentWillLoad() {
    this.recipe = {
      name: 'todo',
      calories: 0,
      image: 'todo',
      ingredients: [],
      fat: 0,
      protein: 0,
      carbs: 0,
      steps: [],
      category: 'todo',
      favorite: false,
      utensils: [],
    };
  }

  @Listen('recipeInputData')
  getRecipeInputData(event: CustomEvent<IRecipeInputs>) {
    this.recipe = {
      ...this.recipe,
      ...event.detail,
    };
  }

  @Listen('ingredientsInputData')
  getIngredientsInputData(event: CustomEvent<IIngredient[]>) {
    this.recipe = {
      ...this.recipe,
      ingredients: event.detail,
    };
  }
  @Listen('stepsInputData')
  getStepsInputData(event: CustomEvent<string[]>) {
    this.recipe = {
      ...this.recipe,
      steps: event.detail,
    };
  }
  @Listen('utensilInputData')
  getUtensilsInputData(event: CustomEvent<string[]>) {
    this.recipe = {
      ...this.recipe,
      utensils: event.detail,
    };
  }

  handleSubmit = async (event: MouseEvent) => {
    event.preventDefault();
    try {
      if (!this.recipe.category) {
        throw new Error(`Category was not picked.`);
      }
      if (isNaN(this.recipe.calories)) {
        throw new Error(`Calories is not a number.`);
      }
      if (isNaN(this.recipe.carbs)) {
        throw new Error(`Carbs is not a number.`);
      }
      if (isNaN(this.recipe.protein)) {
        throw new Error(`Protein is not a number.`);
      }
      if (isNaN(this.recipe.fat)) {
        throw new Error(`Fat is not a number.`);
      }
      if (this.recipe.ingredients.length <= 0) {
        throw new Error(`Recipes have to have at least one ingredient.`);
      }
      if (this.recipe.steps.length <= 0) {
        throw new Error(`Recipes have to have at least one steps.`);
      }
      const { name } = addRecipe(this.recipe);
      const toast = await toastController.create({
        message: `${name} was added!`,
        duration: 1000,
        cssClass: 'toast-success',
      });
      toast.present();
      const nav = document.querySelector('ion-nav');
      setTimeout(() => nav.popToRoot(), 1000);
    } catch (error) {
      const toast = await toastController.create({
        message: error,
        duration: 1500,
        cssClass: 'toast-error',
      });
      toast.present();
    }
  };

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>New Recipe</ion-title>
            <ion-buttons slot="start">
              <ion-back-button defaultHref="/" />
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <form onSubmit={this.handleSubmit}>
            <recipe-inputs />
            <ingredients-inputs />
            <utensils-inputs />
            <steps-inputs />
            <ion-button expand="block" type="submit">
              Add New Recipe
            </ion-button>
          </form>
        </ion-content>
      </Host>
    );
  }
}
