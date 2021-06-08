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
      notes: '',
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

  handleInput = (event: Event) => (this.recipe.notes = event.target['value']);

  handleSubmit = async (event: MouseEvent) => {
    let totalCalories = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalProtein = 0;
    event.preventDefault();
    try {
      if (!this.recipe.category) {
        throw new Error(`Category was not picked.`);
      }
      if (this.recipe.ingredients.length <= 0) {
        throw new Error(`Recipes have to have at least one ingredient.`);
      }
      if (this.recipe.steps.length <= 0) {
        throw new Error(`Recipes have to have at least one steps.`);
      }
      this.recipe.ingredients.map((ingredient, i) => {
        if (isNaN(ingredient.calories)) {
          throw new Error(`Ingredient ${i}: Calories is not a number.`);
        }
        if (isNaN(ingredient.carbs)) {
          throw new Error(`Ingredient ${i}: Carbs is not a number.`);
        }
        if (isNaN(ingredient.fat)) {
          throw new Error(`Ingredient ${i}: Fat is not a number.`);
        }
        if (isNaN(ingredient.protein)) {
          throw new Error(`Ingredient ${i}: Protein is not a number.`);
        }
        totalCalories += ingredient.calories;
        totalCarbs += ingredient.carbs;
        totalFat += ingredient.fat;
        totalProtein += ingredient.protein;
      });
      this.recipe.calories = totalCalories;
      this.recipe.carbs = totalCarbs;
      this.recipe.fat = totalFat;
      this.recipe.protein = totalProtein;
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
            <ion-list lines="none">
              <recipe-inputs />
              <ingredients-inputs />
              <utensils-inputs />
              <steps-inputs />
            </ion-list>
            <h5>Notes</h5>
            <ion-textarea onInput={this.handleInput}></ion-textarea>
            <ion-button expand="block" type="submit">
              Add New Recipe
            </ion-button>
          </form>
        </ion-content>
      </Host>
    );
  }
}
