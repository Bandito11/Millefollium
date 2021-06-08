import { toastController } from '@ionic/core';
import { Component, Host, h, State } from '@stencil/core';
import { IRecipe } from '../../interfaces/IRecipe';
import { getRecipe, updateRecipe } from '../../services/recipe';
import { capitalizeFirstLetter } from '../../helpers/utils';
import { routes } from '../../helpers/routes';
@Component({
  tag: 'app-recipe-info',
  styleUrl: 'app-recipe-info.css',
})
export class AppRecipeInfo {
  @State() recipe: IRecipe;

  componentWillLoad() {
    const urlValues = location.pathname.split('/');
    const name = urlValues.pop().replace(/%20/g, ' ').trim();
    this.recipe = getRecipe(name);
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
              <ion-back-button defaultHref={routes.baseUrl}></ion-back-button>
            </ion-buttons>
            <ion-buttons slot="end">
              <ion-button href={routes.recipe.edit(this.recipe.name)}>
                Edit
              </ion-button>
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
          <h3>Macronutrients</h3>
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
            {this.recipe.ingredients.map((ingredient, i) =>
              i % 2 ? (
                <ion-item color="light">
                  <ion-label class="ion-text-capitalize">
                    {ingredient.name}
                  </ion-label>
                  <ion-label class="ion-text-wrap">
                    {ingredient.amount}
                  </ion-label>
                </ion-item>
              ) : (
                <ion-item>
                  <ion-label class="ion-text-capitalize">
                    {ingredient.name}
                  </ion-label>
                  <ion-label class="ion-text-wrap">
                    {ingredient.amount}
                  </ion-label>
                </ion-item>
              )
            )}
          </ion-list>
          {this.recipe.utensils.length > 0 ? (
            <div>
              <h3>Cooking Utensils</h3>
              <ion-list lines="none">
                {this.recipe.utensils.map((utensil, i) =>
                  i % 2 ? (
                    <ion-item color="light">
                      <ion-label class="ion-text-capitalize">
                        {utensil}
                      </ion-label>
                    </ion-item>
                  ) : (
                    <ion-item>
                      <ion-label class="ion-text-capitalize">
                        {utensil}
                      </ion-label>
                    </ion-item>
                  )
                )}
              </ion-list>
            </div>
          ) : null}
          <h3>How to prepare</h3>
          <ion-list lines="none">
            {this.recipe.steps.map((step, i) =>
              i % 2 ? (
                <ion-item color="light">
                  <ion-label id="steps" class="ion-text-wrap">
                    {capitalizeFirstLetter(step)}
                  </ion-label>
                </ion-item>
              ) : (
                <ion-item>
                  <ion-label id="steps" class="ion-text-wrap">
                    {capitalizeFirstLetter(step)}
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
