import {
  ScrollDetail,
  SearchbarChangeEventDetail,
  toastController,
} from '@ionic/core';
import { Component, Host, h, State, Listen } from '@stencil/core';
import { logger } from '../../helpers/logger';
import { routes } from '../../helpers/routes';
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
  async categoryCompletedHandler(event: CustomEvent<string>) {
    this.recipes = await filterRecipesByCategory(event.detail);
  }

  scrollForNewRecipes = async (ev: CustomEvent<ScrollDetail>) => {
    const content = document.querySelector<HTMLIonContentElement>(
      '#recipe-list-content'
    );
    const scroll = await content.getScrollElement();
    this.scrollTopMax = scroll['scrollTopMax'];

    if (ev.detail.currentY === this.scrollTopMax) {
      //FIXME: Test the Refresh when user have more than 10 daily entries
      if (this.recipes.length > 9) {
        await this.getRecipes();
      }
    }
  };

  async componentWillLoad() {
    await this.getRecipes();
  }

  clearSearch = async (ev: CustomEvent<KeyboardEvent>) => {
    if (!ev.target['value']) {
      await this.getRecipes();
    }
  };

  async getRecipes() {
    try {
      let meals: IRecipe[];
      if (this.recipes?.length > 0) {
        meals = await getRecipes(this.recipes[this.recipes?.length]);
      } else {
        meals = await getRecipes();
      }
      this.recipes = [...meals];
    } catch (error) {
      this.recipes = [];
      logger(error);
    }
  }

  searchRecipe = async (ev: CustomEvent<SearchbarChangeEventDetail>) => {
    const term = ev.detail.value.toLowerCase().trim();
    if (term) {
      try {
        this.recipes = await searchRecipe(term);
      } catch (error) {
        console.error(error);
      }
    }
  };

  searchCancelClicked = async () => {
    await this.getRecipes();
  };

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

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-searchbar
              id="recipe-list-searchbar"
              onIonInput={this.clearSearch}
              onIonClear={this.searchCancelClicked}
              onIonChange={this.searchRecipe}
              inputmode="text"
              type="search"
              debounce={500}
              spellcheck={true}
              autocomplete="on"
            />
            <ion-buttons slot="end">
              <ion-button href={routes.recipe.add}>New</ion-button>
              <ion-button href={routes.profile}>
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
          onIonScroll={this.scrollForNewRecipes}
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
                  fill="outline"
                  onClick={() => this.addDailyMeal(recipe)}
                >
                  <ion-icon slot="icon-only" name="add"></ion-icon>
                </ion-button>
                <ion-button
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
