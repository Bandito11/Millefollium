import { toastController } from '@ionic/core';
import { Component, Host, h, State } from '@stencil/core';
import { goToRecipeInfo } from '../../helpers/utils';
import { IMeal } from '../../interfaces';

@Component({
  tag: 'app-recipe-list',
  styleUrl: 'app-recipe-list.css',
})
export class AppRecipeList {
  scrollTopMax: number;
  @State() meals: IMeal[];

  componentWillLoad() {
    this.meals = [];
    this.getNewRecipes();
  }

  async componentDidLoad() {
    const content = document.querySelector<HTMLIonContentElement>('#food-list-content');
    const scroll = await content.getScrollElement();
    this.scrollTopMax = scroll['scrollTopMax'];

  }
  getNewRecipes(): void {
    //////?TODO: Get this information from database
    const frenchToast: IMeal = {
      name: 'French Toast',
      ingredients: [],
      image: '/assets/images/frenchtoast.jpg',
      protein: 24,
      carbs: 12,
      steps: [],
      calories: 400,
      fat: 19,
      category: 'breakfast',
      ratings: 5
    }

    const chickenRice: IMeal = {
      name: 'Chicken with Rice & Spinach',
      ingredients: [],
      image: '/assets/images/chickenrice.jpg',
      protein: 30,
      carbs: 40,
      steps: [],
      calories: 600,
      fat: 10,
      category: 'dinner',
      ratings: 3
    }

    this.meals = [frenchToast, chickenRice];
    /////////

  }

  getToolbar() {
    return <ion-toolbar color="primary">
      <ion-buttons slot="start">
        <ion-back-button defaultHref="/"></ion-back-button>
      </ion-buttons>
      <ion-searchbar onIonChange={ev => this.searchRecipe(ev)} inputmode="text" type="search" debounce={500} spellcheck={true} autocomplete="on"></ion-searchbar>
      <ion-buttons slot="end">
        <ion-button href="/recipe/favorite">
          <ion-icon name="heart-outline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  }
  searchRecipe(ev: CustomEvent<import("@ionic/core").SearchbarChangeEventDetail>): void {
    const query = ev.detail.value;
    if (query) {
      console.error('Search Term: ', query)
    }
  }

  queryNewRecipes(ev: CustomEvent<import("@ionic/core").ScrollDetail>): void {
    if (ev.detail.isScrolling && (ev.detail.scrollTop == this.scrollTopMax)) {
      //TODO: Refresh when user have more than 10 daily entries
      console.error('scroll in recipe list...')
    }
  }

  choseCategory(ev: CustomEvent<import("@ionic/core").SegmentChangeEventDetail>): void {
    console.log('Query by Category: ', ev.detail.value)
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
        <ion-content id="food-list-content" scrollEvents={true} onIonScroll={(ev => this.queryNewRecipes(ev))} class="ion-padding">
          <ion-list lines="none">
            {
              this.meals.map(meal =>
                <app-recipe-daily
                  name={meal.name}
                  calories={meal.calories}
                  image={meal.image}
                >
                  <div slot="category">Category: {meal.category}</div>
                  {
                    meal.ratings > 0 ? <ion-icon slot="ratings" name="star-sharp"></ion-icon> : <ion-icon slot="ratings" name="star-outline"></ion-icon>
                  }
                  {
                    meal.ratings > 1 ? <ion-icon slot="ratings" name="star-sharp"></ion-icon> : <ion-icon slot="ratings" name="star-outline"></ion-icon>
                  }
                  {
                    meal.ratings > 2 ? <ion-icon slot="ratings" name="star-sharp"></ion-icon> : <ion-icon slot="ratings" name="star-outline"></ion-icon>
                  }
                  {
                    meal.ratings > 3 ? <ion-icon slot="ratings" name="star-sharp"></ion-icon> : <ion-icon slot="ratings" name="star-outline"></ion-icon>
                  }
                  {
                    meal.ratings > 4 ? <ion-icon slot="ratings" name="star-sharp"></ion-icon> : <ion-icon slot="ratings" name="star-outline"></ion-icon>
                  }
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
  async addDailyMeal(meal: IMeal) {
    //TODO: Add to DB
    const toast = await toastController.create({
      message: `Added ${meal.name} to daily!`,
      duration: 3000,
      color: 'success'
    });
    await toast.present();
  }
  filterRecipes(arg0: string): void {
    //TODO: Filter for Recipe arg0
    console.error('Filter: ', arg0)
  }
}
