import { toastController } from '@ionic/core';
import { Component, Host, h, State } from '@stencil/core';
import { IRecipe } from '../../interfaces/IRecipe';
import { getRecipe, updateRecipe } from '../../services/recipe';
import { routes } from '../../helpers/routes';
@Component({
  tag: 'app-recipe-info',
  styleUrl: 'app-recipe-info.css',
})
export class AppRecipeInfo {
  @State() recipe: IRecipe & LokiObj;

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
          <h4>Macronutrients</h4>
          <ion-list lines="none">
            <macro-details
              carbs={this.recipe.carbs}
              fat={this.recipe.fat}
              protein={this.recipe.protein}
            />
          </ion-list>
          <h4 class="ion-text-capitalize">Category: {this.recipe.category}</h4>
          <h5>Ingredients</h5>
          <ion-list lines="none">
            {this.recipe.ingredients.map((ingredient, i) =>
              i % 2 ? (
                <ingredient-details
                  color="light"
                  name={ingredient.name}
                  calories={ingredient.calories}
                  carbs={ingredient.carbs}
                  fat={ingredient.fat}
                  protein={ingredient.protein}
                  amount={ingredient.amount}
                />
              ) : (
                <ingredient-details
                  name={ingredient.name}
                  calories={ingredient.calories}
                  carbs={ingredient.carbs}
                  fat={ingredient.fat}
                  protein={ingredient.protein}
                  amount={ingredient.amount}
                />
              )
            )}
          </ion-list>
          {this.recipe.utensils.length > 0 ? (
            <div>
              <h5>Cooking Utensils</h5>
              <ion-list lines="none">
                {this.recipe.utensils.map((utensil, i) =>
                  i % 2 ? (
                    <utensil-details color="light" utensil={utensil} />
                  ) : (
                    <utensil-details utensil={utensil} />
                  )
                )}
              </ion-list>
            </div>
          ) : null}
          <h5>How to prepare</h5>
          <ion-list lines="none">
            {this.recipe.steps.map((step, i) =>
              i % 2 ? (
                <step-details color="light" step={step} />
              ) : (
                <step-details step={step} />
              )
            )}
          </ion-list>
          {this.recipe.notes ? (
            <div>
              <h5>Notes</h5>
              <ion-label>
                <p>{this.recipe.notes}</p>
              </ion-label>
            </div>
          ) : null}
        </ion-content>
      </Host>
    );
  }
}
