import { toastController } from '@ionic/core';
import { Component, Host, h, State, Listen } from '@stencil/core';
import { initLocalDB } from '../../database/loki-db';
import { capitalizeAllFirstLetters, goToRecipeInfo } from '../../helpers/utils';
import { IRecipe } from '../../interfaces/IRecipe';
import { addNewDailyMeal } from '../../services/daily.tracker';
import {
  filterRecipesByCategory,
  getRecipes,
  searchRecipe,
} from '../../services/recipe';

@Component({
  tag: 'app-recipe-list',
  styleUrl: 'app-recipe-list.css',
})
export class AppRecipeList {
  scrollTopMax: number;
  @State() recipes: IRecipe[];

  @Listen('categoryCompleted')
  categoryCompletedHandler(event: CustomEvent<string>) {
    this.filterRecipes(event.detail);
  }

  async scrollForNewRecipes(
    ev: CustomEvent<import('@ionic/core').ScrollDetail>
  ) {
    const content = document.querySelector<HTMLIonContentElement>(
      '#recipe-list-content'
    );
    const scroll = await content.getScrollElement();
    this.scrollTopMax = scroll['scrollTopMax'];

    if (ev.detail.currentY === this.scrollTopMax) {
      //FIXME: Test the Refresh when user have more than 10 daily entries
      if (this.recipes.length > 9) {
        this.getRecipes();
      }
    }
  }

  async componentWillLoad() {
    this.recipes = [];
    await initLocalDB();
    this.getRecipes();
  }

  clearSearch(ev: CustomEvent<KeyboardEvent>): void {
    if (!ev.target['value']) {
      this.getRecipes();
    }
  }

  async getRecipes() {
    try {
      let meals: IRecipe[];
      if (this.recipes.length > 0) {
        meals = await getRecipes(this.recipes[this.recipes.length]);
      } else {
        meals = await getRecipes();
      }
      if (meals && meals.length > 0) {
        this.recipes = [...meals];
      }
    } catch (error) {
      console.error(error);
    }
  }

  async searchRecipe(
    ev: CustomEvent<import('@ionic/core').SearchbarChangeEventDetail>
  ) {
    const term = ev.detail.value.toLowerCase().trim();
    if (term) {
      try {
        this.recipes = await searchRecipe(term);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async searchCancelClicked() {
    this.getRecipes();
  }

  async addDailyMeal(meal: IRecipe) {
    let message = '';
    try {
      const response = await addNewDailyMeal(meal);
      if (response) {
        message = `Added ${meal.name} to daily!`;
      } else {
        message = `${capitalizeAllFirstLetters(
          meal.name
        )} couldn't be added to daily. Please try again later.`;
      }
    } catch (error) {
      message = error;
    }
    const toast = await toastController.create({
      message: message,
      duration: 1000,
      color: 'success',
    });
    await toast.present();
  }

  async filterRecipes(category: string) {
    this.recipes = await filterRecipesByCategory(category);
  }

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-searchbar
              id="recipe-list-searchbar"
              onIonInput={(ev) => this.clearSearch(ev)}
              onIonClear={() => this.searchCancelClicked()}
              onIonChange={(ev) => this.searchRecipe(ev)}
              inputmode="text"
              type="search"
              debounce={500}
              spellcheck={true}
              autocomplete="on"
            />
            <ion-buttons slot="end">
              <ion-button href="/recipe/add">New</ion-button>
              <ion-button href="/user/profile">
                <ion-icon
                  slot="icon-only"
                  name="ellipsis-vertical-outline"
                ></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-toolbar>
          <category-chips />
        </ion-toolbar>
        <ion-content
          id="recipe-list-content"
          scrollEvents={true}
          onIonScroll={(ev) => this.scrollForNewRecipes(ev)}
          class="ion-padding"
        >
          <ion-list lines="none">
            {this.recipes.map((recipe) => (
              <recipe-item
                name={recipe.name}
                calories={recipe.calories}
                image={recipe.image}
              >
                <div slot="category" class="ion-text-capitalize">
                  Category: {recipe.category}
                </div>
                <ion-button
                  slot="buttons"
                  fill="outline"
                  onClick={() => this.addDailyMeal(recipe)}
                >
                  <ion-icon slot="icon-only" name="add"></ion-icon>
                </ion-button>
                <ion-button
                  slot="buttons"
                  fill="outline"
                  onClick={() => goToRecipeInfo(recipe.name)}
                >
                  <ion-icon
                    slot="icon-only"
                    name="information-outline"
                  ></ion-icon>
                </ion-button>
              </recipe-item>
            ))}
          </ion-list>
        </ion-content>
      </Host>
    );
  }
}
