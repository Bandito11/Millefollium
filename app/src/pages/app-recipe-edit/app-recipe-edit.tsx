import { toastController } from '@ionic/core';
import { Component, Host, h, Listen, State } from '@stencil/core';
import { routes } from '../../helpers/routes';
import { capitalizeAllFirstLetters } from '../../helpers/utils';
import { IIngredient } from '../../interfaces/IIngredient';
import { IRecipe } from '../../interfaces/IRecipe';
import { IRecipeInputs } from '../../interfaces/IRecipeInputs';
import { getRecipe, removeRecipe, updateRecipe } from '../../services/recipe';

@Component({
  tag: 'app-recipe-edit',
  styleUrl: 'app-recipe-edit.css',
})
export class AppRecipeEdit {
  @State() recipe: IRecipe & LokiObj;

  componentWillLoad() {
    const urlValues = location.pathname.split('/');
    const name = urlValues.pop().replace(/%20/g, ' ').trim();
    this.recipe = getRecipe(name);
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

  deleteRecipe = async () => {
    const { name } = removeRecipe(this.recipe);
    if (name) {
      const toast = await toastController.create({
        message: `${name} was deleted successfully!`,
        duration: 1000,
        cssClass: 'toast-error',
      });
      toast.present();
      const nav = document.querySelector('ion-nav');
      setTimeout(() => nav.popToRoot(), 1000);
    } else {
      const toast = await toastController.create({
        message: `Couldn't remove this recipe because it doesn't exist in the database.`,
        duration: 1500,
        cssClass: 'toast-error',
      });
      toast.present();
    }
  };

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
      const { name } = updateRecipe(this.recipe);
      const toast = await toastController.create({
        message: `${name} was edited successfully!`,
        duration: 1000,
        cssClass: 'toast-success',
        position: 'top',
      });
      toast.present();
      const nav = document.querySelector('ion-nav');
      setTimeout(() => nav.popToRoot(), 1000);
    } catch (error) {
      const toast = await toastController.create({
        message: error,
        duration: 1500,
        cssClass: 'toast-error',
        position: 'top',
      });
      toast.present();
    }
  };
  handleInput = (event: Event) => (this.recipe.notes = event.target['value']);

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>
              Edit {capitalizeAllFirstLetters(this.recipe.name)}
            </ion-title>
            <ion-buttons slot="start">
              <ion-back-button
                defaultHref={routes.recipe.info(this.recipe.name)}
              />
            </ion-buttons>
            <ion-buttons slot="end">
              <ion-button onClick={this.deleteRecipe}>Delete</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <form onSubmit={this.handleSubmit}>
            <recipe-inputs
              name={this.recipe.name}
              category={this.recipe.category}
            />
            <ingredients-inputs ingredients={this.recipe.ingredients} />
            <utensils-inputs utensils={this.recipe.utensils} />
            <steps-inputs steps={this.recipe.steps} />
            <h5>Notes</h5>
            <ion-textarea onInput={this.handleInput}></ion-textarea>
            <ion-button expand="block" type="submit">
              Edit Recipe
            </ion-button>
          </form>
        </ion-content>
      </Host>
    );
  }
}
