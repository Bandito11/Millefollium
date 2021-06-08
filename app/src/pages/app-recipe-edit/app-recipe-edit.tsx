import { toastController } from '@ionic/core';
import { Component, Host, h, Listen } from '@stencil/core';
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
  data: IRecipe;
  recipe: IRecipe;

  componentWillLoad() {
    const urlValues = location.pathname.split('/');
    const name = urlValues.pop().replace(/%20/g, ' ').trim();
    this.data = getRecipe(name);
    this.recipe = {
      ...this.data,
    };
  }

  @Listen('recipeInputData')
  getRecipeInputData(event: CustomEvent<IRecipeInputs>) {
    this.data = {
      ...this.data,
      ...event.detail,
    };
  }

  @Listen('ingredientsInputData')
  getIngredientsInputData(event: CustomEvent<IIngredient[]>) {
    this.data = {
      ...this.data,
      ingredients: event.detail,
    };
  }
  @Listen('stepsInputData')
  getStepsInputData(event: CustomEvent<string[]>) {
    this.data = {
      ...this.data,
      steps: event.detail,
    };
  }
  @Listen('utensilInputData')
  getUtensilsInputData(event: CustomEvent<string[]>) {
    this.data = {
      ...this.data,
      utensils: event.detail,
    };
  }

  deleteRecipe = async () => {
    const { name } = removeRecipe(this.recipe);
    if (name) {
      const toast = await toastController.create({
        message: `${name} was deleted successfully!`,
        duration: 1500,
        cssClass: 'toast-error',
      });
      toast.present();
      setTimeout(() => (location.href = '/'), 1500);
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
    event.preventDefault();
    try {
      if (!this.data.category) {
        throw new Error(`Category was not picked.`);
      }
      if (isNaN(this.data.calories)) {
        throw new Error(`Calories is not a number.`);
      }
      if (isNaN(this.data.carbs)) {
        throw new Error(`Carbs is not a number.`);
      }
      if (isNaN(this.data.protein)) {
        throw new Error(`Protein is not a number.`);
      }
      if (isNaN(this.data.fat)) {
        throw new Error(`Fat is not a number.`);
      }
      if (this.data.ingredients.length <= 0) {
        throw new Error(`Recipes have to have at least one ingredient.`);
      }
      if (this.data.steps.length <= 0) {
        throw new Error(`Recipes have to have at least one steps.`);
      }
      const { name } = updateRecipe(this.data);
      const toast = await toastController.create({
        message: `${name} was edited successfully!`,
        duration: 1500,
        cssClass: 'toast-success',
      });
      toast.present();
      setTimeout(() => history.back(), 1500);
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
              name={this.data.name}
              calories={this.data.calories}
              fat={this.data.fat}
              protein={this.data.protein}
              carbs={this.data.carbs}
              category={this.data.category}
            />
            <ingredients-inputs ingredients={this.data.ingredients} />
            <utensils-inputs utensils={this.data.utensils} />
            <steps-inputs steps={this.data.steps} />
            <ion-button expand="block" type="submit">
              Edit Recipe
            </ion-button>
          </form>
        </ion-content>
      </Host>
    );
  }
}
