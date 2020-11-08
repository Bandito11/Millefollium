import { toastController } from '@ionic/core';
import { Component, Host, h, State } from '@stencil/core';
import { goToRecipeInfo } from '../../helpers/utils';
import { IRecipe } from '../../interfaces';
import { addNewDailyMeal } from '../../services/daily.tracker.service';
import { getFavoriteRecipes, removeFromFavorites } from '../../services/recipe.service';

@Component({
  tag: 'app-recipe-favorite',
  styleUrl: 'app-recipe-favorite.css'
})
export class AppRecipeFavorite {
  scrollTopMax: number;
  @State() meals: IRecipe[];

  componentWillLoad() {
    this.meals = [];
    this.getFavoriteRecipes();
  }

  async componentDidLoad() {
    const content = document.querySelector<HTMLIonContentElement>('#food-list-content');
    const scroll = await content.getScrollElement();
    this.scrollTopMax = scroll['scrollTopMax'];

  }
  async getFavoriteRecipes() {
    //////?TODO: Get this information from database
    try {
      const meals = await getFavoriteRecipes();
      if (meals && meals.length > 0) {
        this.meals = meals;
      }
    } catch (error) {
      console.error(error);
    }

    /////////

  }

  searchRecipe(ev: CustomEvent<import("@ionic/core").SearchbarChangeEventDetail>): void {
    const query = ev.detail.value.toLowerCase();
    if (query) {
      //TODO: Get from local database
      console.error('Search Term: ', query)
    }
  }

  queryNewRecipes(ev: CustomEvent<import("@ionic/core").ScrollDetail>): void {
    if ((ev.detail.currentY == this.scrollTopMax)) {
      //TODO: Refresh when user have more than 10 daily entries
      console.error('scroll in favorite list...')
      this.getFavoriteRecipes();
    }
  }

  async removeFromFavorites(meal: IRecipe) {
    try {
      const result = await removeFromFavorites(meal);
      if(result){
        const index = this.meals.findIndex(meal => meal.name === meal.name);
        const meals = this.meals.splice(index, 1);
        this.meals = [...meals];
        const toast = await toastController.create({
          message: 'Recipe item was successfully deleted from Favorites',
          color: 'success',
          duration: 1000
        });
        toast.present();
      } else {
        throw new Error(`Favorite item was: ${result}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  getToolbar(footer?: boolean) {
    return <ion-toolbar color="primary">
      {
        footer ? "" : <ion-title>Favorite</ion-title>
      }
      <ion-buttons slot="start">
        <ion-back-button defaultHref="/recipe/list"></ion-back-button>
      </ion-buttons>
    </ion-toolbar>
  }

  async addDailyMeal(meal: IRecipe) {
    try {
      const result = addNewDailyMeal(meal);
      if (result) {
        const toast = await toastController.create({
          message: `Added ${meal.name} to daily!`,
          duration: 1000,
          color: 'success'
        });
        await toast.present();
        return;
      }
      throw new Error('No recipe exist with this information in the database.');
    } catch (error) {
      console.log(error)
    }
  }
  filterRecipes(filter: string): void {
    //TODO: Filter for Recipe arg0
    console.error('Filter: ', filter)
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
        <ion-toolbar>
          <ion-chip outline onClick={() => this.filterRecipes("breakfast")}>
            <ion-label>Breakfast</ion-label>
          </ion-chip>
          <ion-chip outline onClick={() => this.filterRecipes("lunch")}>
            <ion-label>Lunch</ion-label>
          </ion-chip>
          <ion-chip outline onClick={() => this.filterRecipes("dinner")}>
            <ion-label>Dinner</ion-label>
          </ion-chip>
          <ion-chip outline onClick={() => this.filterRecipes("snack")}>
            <ion-label>Snack</ion-label>
          </ion-chip>
          <ion-chip outline onClick={() => this.filterRecipes("dessert")}>
            <ion-label>Dessert</ion-label>
          </ion-chip>
          <ion-chip outline onClick={() => this.filterRecipes("none")}>
            <ion-label>None</ion-label>
          </ion-chip>
        </ion-toolbar>
        <ion-content
          id="food-list-content"
          scrollEvents={true}
          onIonScroll={(ev => this.queryNewRecipes(ev))}
          class="ion-padding"
        >
          <ion-list lines="none">
            {
              this.meals.map(meal =>
                <app-recipe-daily
                  name={meal.name}
                  calories={meal.calories}
                  image={meal.image}
                >
                  <div slot="category">Category: {meal.category}</div>
                  <ion-button slot="buttons" fill="outline" onClick={() => this.addDailyMeal(meal)}>
                    <ion-icon slot="icon-only" name="add"></ion-icon>
                  </ion-button>
                  <ion-button slot="buttons" fill="outline" onClick={() => goToRecipeInfo(meal.name)}>
                    <ion-icon slot="icon-only" name="information-outline"></ion-icon>
                  </ion-button>
                  <ion-button slot="buttons" fill="outline" onClick={() => this.removeFromFavorites(meal)}>
                    <ion-icon name="remove-outline"></ion-icon>
                  </ion-button>
                </app-recipe-daily>
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
