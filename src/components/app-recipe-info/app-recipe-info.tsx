import { toastController } from '@ionic/core';
import { State } from '@ionic/core/dist/types/stencil-public-runtime';
import { Component, Host, h } from '@stencil/core';
import { IRecipe } from '../../interfaces';
import { getRecipeInfo, setFavorite } from '../../services/recipe.service';

@Component({
  tag: 'app-recipe-info',
  styleUrl: 'app-recipe-info.css'
})
export class AppRecipeInfo {

  @State() recipe: IRecipe;

  componentWillLoad() {
    this.recipe = {
      name: null,
      ingredients: [],
      image: null,
      protein: null,
      carbs: null,
      steps: [],
      calories: null,
      fat: null,
      category: null,
      ratings: null,
      favorite: null
    }
    this.getRecipeInfo();
  }

  async getRecipeInfo() {
    const urlValues = location.pathname.split('/');
    const name = urlValues.pop().replace(/%20/g, ' '); //used to query results
    try {
      const data = await getRecipeInfo(name);
      if (data) {
        this.recipe = {
          ...data,
          category: data.category
        };
      }
    } catch (error) {
      console.error(error);
    }
  }

  getToolbar(footer?: boolean) {
    return <ion-toolbar color="primary">
      {
        footer ? "" : <ion-title class="ion-text-capitalize">{this.recipe.name}</ion-title>
      }
      <ion-buttons slot="start">
        <ion-back-button defaultHref="/"></ion-back-button>
      </ion-buttons>
    </ion-toolbar>
  }

  async setFavorite() {
    if (!this.recipe.favorite) {
      this.recipe = {
        ...this.recipe,
        favorite: true
      }
    } else {
      this.recipe = {
        ...this.recipe,
        favorite: false
      }
    }
    try {
      const result = setFavorite(this.recipe);
      let options = {
        message: '',
        color: ''
      };
      if (result) {
        if (this.recipe.favorite) {
          options.message = `Added to favorites.`;
          options.color = 'success';
        } else {
          options.message = `Removed from favorites.`;
          options.color = 'danger'
        }
        const toast = await toastController.create({
          message: options.message,
          duration: 1000,
          color: options.color
        });
        toast.present();
      } else {
        const toast = await toastController.create({
          message: `Couldn't be added to favorites. Please try again later.`,
          duration: 1000,
          color: 'danger'
        });
        toast.present();
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <Host>
        <ion-header>
          {
            navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
              ? ''
              : this.getToolbar()
          }
        </ion-header>
        <ion-content class="ion-padding">
          <h2 class="ion-text-capitalize">{this.recipe.name}</h2>
          <ion-img src={this.recipe.image}></ion-img>
          <ion-item lines="none" id="favorite-calories-text">
            <ion-label>{this.recipe.calories} calories</ion-label>
            <ion-button onClick={() => this.setFavorite()} fill="clear">
              {
                this.recipe.favorite
                  ? <ion-icon id="favorite-icon" name="heart-sharp"></ion-icon>
                  : <ion-icon id="favorite-icon" name="heart-outline"></ion-icon>

              }
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
          <div>
            {
              this.recipe.ratings > 0 ? <ion-icon slot="ratings" name="star-sharp"></ion-icon> : <ion-icon slot="ratings" name="star-outline"></ion-icon>
            }
            {
              this.recipe.ratings > 1 ? <ion-icon slot="ratings" name="star-sharp"></ion-icon> : <ion-icon slot="ratings" name="star-outline"></ion-icon>
            }
            {
              this.recipe.ratings > 2 ? <ion-icon slot="ratings" name="star-sharp"></ion-icon> : <ion-icon slot="ratings" name="star-outline"></ion-icon>
            }
            {
              this.recipe.ratings > 3 ? <ion-icon slot="ratings" name="star-sharp"></ion-icon> : <ion-icon slot="ratings" name="star-outline"></ion-icon>
            }
            {
              this.recipe.ratings > 4 ? <ion-icon slot="ratings" name="star-sharp"></ion-icon> : <ion-icon slot="ratings" name="star-outline"></ion-icon>
            }
          </div>
          <h3>Ingredients</h3>
          <ion-list lines="none">
            {
              this.recipe.ingredients.map(ingredient =>
                <ion-item>
                  <ion-label class="ion-text-capitalize">{ingredient.name}</ion-label>
                  <ion-label class="ion-text-wrap">{ingredient.amount}</ion-label>
                </ion-item>
              )
            }
          </ion-list>
          <h3>Cooking Tools</h3>
          <ion-list lines="none">
          </ion-list>
          <h3>How to prepare</h3>
          <ion-list lines="none">
            {
              this.recipe.steps.map((step, i) =>
                i % 2
                  ? <ion-item color="light">
                    <ion-label id="steps" class="ion-text-wrap">{step}</ion-label>
                  </ion-item>
                  : <ion-item>
                    <ion-label id="steps" class="ion-text-wrap">{step}</ion-label>
                  </ion-item>
              )
            }
          </ion-list>
        </ion-content>
        <ion-footer>
          {
            navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
              ? this.getToolbar(true)
              : ''
          }
        </ion-footer>
      </Host>
    );
  }
}
