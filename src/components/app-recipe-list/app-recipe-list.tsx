import { toastController } from '@ionic/core';
import { Component, Host, h, State } from '@stencil/core';
import { capitalizeAllFirstLetters, goToRecipeInfo } from '../../helpers/utils';
import { IRecipe } from '../../interfaces';
import { addNewDailyMeal } from '../../services/daily.tracker.service';
import { filterRecipesByCategory, getRecipes, searchRecipeInAPI } from '../../services/recipe.service';

@Component({
  tag: 'app-recipe-list',
  styleUrl: 'app-recipe-list.css',
})
export class AppRecipeList {
  scrollTopMax: number;
  @State() recipes: IRecipe[];
  initRecipes: IRecipe[];

  async scrollForNewRecipes(ev: CustomEvent<import("@ionic/core").ScrollDetail>) {
    const content = document.querySelector<HTMLIonContentElement>('#recipe-list-content');
    const scroll = await content.getScrollElement();
    this.scrollTopMax = scroll['scrollTopMax'];

    if (ev.detail.currentY === this.scrollTopMax) {
      //TODO: Refresh when user have more than 10 daily entries
      if (this.recipes.length > 9) {
        this.getNewRecipes();
      }
    }
  }

  componentWillLoad() {
    this.recipes = [];
    this.getNewRecipes();
  }

  async componentDidLoad() {
    const searchBar = document.querySelector<HTMLIonSearchbarElement>('#recipe-list-searchbar');
    searchBar.setFocus();
  }

  getToolbar() {
    return <ion-toolbar color="primary">
      <ion-buttons slot="start">
        <ion-back-button defaultHref="/"></ion-back-button>
      </ion-buttons>
      <ion-searchbar id="recipe-list-searchbar" onIonInput={ev => this.clearSearch(ev)} onIonClear={() => this.searchCancelClicked()} onIonChange={ev => this.searchRecipe(ev)} inputmode="text" type="search" debounce={500} spellcheck={true} autocomplete="on"></ion-searchbar>
      <ion-buttons slot="end">
        <ion-button href="/recipe/favorite">
          <ion-icon name="heart-outline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  }

  clearSearch(ev: CustomEvent<KeyboardEvent>): void {
    if (!ev.target['value']) {
      this.recipes = [...this.initRecipes];
    }
  }

  async getNewRecipes() {
    try {
      let meals;
      if (this.recipes.length > 0) {
        meals = await getRecipes(this.recipes[this.recipes.length]);
      } else {
        meals = await getRecipes();
      }
      if (meals && meals.length > 0) {
        this.recipes = [...this.recipes, ...meals];
        this.initRecipes = [...this.recipes];
      }
    } catch (error) {
      console.error(error);
    }
  }

  async searchRecipe(ev: CustomEvent<import("@ionic/core").SearchbarChangeEventDetail>) {
    const term = ev.detail.value.toLowerCase();
    if (term) {
      try {
        let meals;
        meals = await searchRecipeInAPI(term);
        this.recipes = [...meals];
      } catch (error) {
        console.error(error);
      }
    }
  }

  async searchCancelClicked() {
    this.recipes = [...this.initRecipes];
  }

  async addDailyMeal(meal: IRecipe) {
    let message = '';
    try {
      const response = await addNewDailyMeal(meal);
      if (response) {
        message = `Added ${meal.name} to daily!`
      } else {
        message = `${capitalizeAllFirstLetters(meal.name)} couldn't be added to daily. Please try again later.`
      }
    } catch (error) {
      message = error;
    }
    const toast = await toastController.create({
      message: message,
      duration: 1000,
      color: 'success'
    });
    await toast.present();
  }

  filterRecipes(category: string): void {
    this.recipes = filterRecipesByCategory({ recipes: this.initRecipes, category: category })
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
        <ion-content id="recipe-list-content" scrollEvents={true} onIonScroll={(ev => this.scrollForNewRecipes(ev))} class="ion-padding">
          <ion-list lines="none">
            {
              this.recipes.map(recipe =>
                <app-recipe-daily
                  name={recipe.name}
                  calories={recipe.calories}
                  image={recipe.image}
                >
                  <div slot="category" class="ion-text-capitalize">Category: {recipe.category}</div>
                  <app-recipe-ratings slot="ratings" recipe={recipe}></app-recipe-ratings>
                  <ion-button slot="buttons" fill="outline" onClick={() => this.addDailyMeal(recipe)}>
                    <ion-icon slot="icon-only" name="add"></ion-icon>
                  </ion-button>
                  <ion-button slot="buttons" fill="outline" onClick={() => goToRecipeInfo(recipe.name)}>
                    <ion-icon slot="icon-only" name="information-outline"></ion-icon>
                  </ion-button>
                </app-recipe-daily>
              )
            }
          </ion-list>
        </ion-content>
        <ion-footer>
          {
            navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
              ? this.getToolbar()
              : ''
          }
        </ion-footer>
      </Host>
    )
  }
}
