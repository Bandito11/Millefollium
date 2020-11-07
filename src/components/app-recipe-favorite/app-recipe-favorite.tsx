import { toastController } from '@ionic/core';
import { Component, Host, h, State } from '@stencil/core';
import { goToRecipeInfo } from '../../helpers/utils';
import { IRecipe } from '../../interfaces';
import { getFavoriteRecipes } from '../../services/recipe.service';

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
  getFavoriteRecipes(): void {
    //////?TODO: Get this information from database

    this.meals = getFavoriteRecipes();
    /////////

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

  async addDailyMeal(meal: IRecipe) {
    //TODO: Add to DB
    const toast = await toastController.create({
      message: `Added ${meal.name} to daily!`,
      duration: 1000,
      color: 'success'
    });
    await toast.present();
  }
  filterRecipes(filter: string): void {
    //TODO: Filter for Recipe arg0
    console.error('Filter: ', filter)
  }

  getSearchbar() {
    return <ion-searchbar onIonChange={ev => this.searchRecipe(ev)} inputmode="text" type="search" debounce={500} spellcheck={true} autocomplete="on"></ion-searchbar>
  }

  render() {
    return (
      <Host>
        <ion-header>
          {
            navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
              ? ''
              : this.getSearchbar()
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
        <ion-content id="food-list-content" scrollEvents={true} onIonScroll={(ev => this.queryNewRecipes(ev))} class="ion-padding">
          {
            navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
              ? ''
              : this.getToolbar()
          }
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
                </app-recipe-daily>
              )
            }
          </ion-list>
          {
            navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
              ? this.getSearchbar()
              : ''
          }
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
