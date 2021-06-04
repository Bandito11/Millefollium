import { toastController } from '@ionic/core';
import { Component, Host, h, State } from '@stencil/core';
import Recipe from '../../models/recipe';
import { IRecipe } from '../../interfaces/IRecipe';
import { getRecipe, updateRecipe } from '../../services/recipe';
@Component({
  tag: 'app-recipe-info',
  styleUrl: 'app-recipe-info.css',
})
export class AppRecipeInfo {
  @State() recipe: IRecipe;

  componentWillLoad() {
    this.recipe = Recipe;
    this.getRecipeInfo();
  }

  getRecipeInfo() {
    const urlValues = location.pathname.split('/');
    const name = urlValues.pop().replace(/%20/g, ' ').trim(); //used to query results
    try {
      const data = getRecipe(name);
      if (data) {
        this.recipe = {
          ...data,
          category: data.category,
        };
      }
    } catch (error) {
      console.error(error);
    }
  }

  async setFavorite() {
    if (!this.recipe.favorite) {
      this.recipe = {
        ...this.recipe,
        favorite: true,
      };
    } else {
      this.recipe = {
        ...this.recipe,
        favorite: false,
      };
    }
      const result = updateRecipe(this.recipe);
      let options = {
        message: '',
        color: '',
      };
      if (result) {
        if (result.favorite) {
          options.message = `Added to favorites.`;
          options.color = 'success';
        } else {
          options.message = `Removed from favorites.`;
          options.color = 'danger';
        }
        const toast = await toastController.create({
          message: options.message,
          duration: 1000,
          color: options.color,
        });
        toast.present();
      } else {
        const toast = await toastController.create({
          message: `Couldn't be added to favorites. Please try again later.`,
          duration: 1000,
          color: 'danger',
        });
        toast.present();
      }
  }

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title class="ion-text-capitalize">
              {this.recipe.name}
            </ion-title>
            <ion-buttons slot="start">
              <ion-back-button defaultHref="/"></ion-back-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <h2 class="ion-text-capitalize">{this.recipe.name}</h2>
          {/* <ion-img src={this.recipe.image}></ion-img> */}
          <ion-item lines="none" id="favorite-calories-text">
            <ion-label>{this.recipe.calories} calories</ion-label>
            <ion-button onClick={() => this.setFavorite()} fill="clear">
              {this.recipe.favorite ? (
                <ion-icon id="favorite-icon" name="heart-sharp"></ion-icon>
              ) : (
                <ion-icon id="favorite-icon" name="heart-outline"></ion-icon>
              )}
            </ion-button>
          </ion-item>
          <h3>Macros</h3>
          <ion-list lines="none">
            <ion-item>
              <ion-label>{this.recipe.protein}g Protein</ion-label>
            </ion-item>
            <ion-item>
              <ion-label>{this.recipe.carbs}g Carbs</ion-label>
            </ion-item>
            <ion-item>
              <ion-label>{this.recipe.fat}g Fat</ion-label>
            </ion-item>
          </ion-list>
          <p class="ion-text-capitalize">Category: {this.recipe.category}</p>
          <h3>Ingredients</h3>
          <ion-list lines="none">
            {this.recipe.ingredients.map((ingredient) => (
              <ion-item>
                <ion-label class="ion-text-capitalize">
                  {ingredient.name}
                </ion-label>
                <ion-label class="ion-text-wrap">{ingredient.amount}</ion-label>
              </ion-item>
            ))}
          </ion-list>
          <h3>Cooking Tools</h3>
          <ion-list lines="none"></ion-list>
          <h3>How to prepare</h3>
          <ion-list lines="none">
            {this.recipe.steps.map((step, i) =>
              i % 2 ? (
                <ion-item color="light">
                  <ion-label id="steps" class="ion-text-wrap">
                    {step}
                  </ion-label>
                </ion-item>
              ) : (
                <ion-item>
                  <ion-label id="steps" class="ion-text-wrap">
                    {step}
                  </ion-label>
                </ion-item>
              )
            )}
          </ion-list>
        </ion-content>
      </Host>
    );
  }
}
