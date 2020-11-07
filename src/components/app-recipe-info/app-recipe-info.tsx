import { Component, Host, h } from '@stencil/core';
import { firstLetterToUpperCase } from '../../helpers/utils';
import { IRecipe } from '../../interfaces';

@Component({
  tag: 'app-recipe-info',
  styleUrl: 'app-recipe-info.css'
})
export class AppRecipeInfo {

  recipe: IRecipe;

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
      ratings: null
    }
    this.getRecipeInfo();
  }

  getRecipeInfo() {
    const urlValues = location.pathname.split('/');
    const name = urlValues.pop().replace(/%20/g, ' '); //used to query results
    //.//TODO: Get from internet /////
    this.recipe = {
      name: 'French Toast',
      ingredients: [
        { name: 'bread' },
        { name: 'vanilla extract' },
        { name: 'cinammon' }
      ],
      image: '/assets/images/frenchtoast.jpg',
      protein: 24,
      carbs: 12,
      steps: [
        'In a medium bowl mix the cinammon, vanilla extract and white eggs',
        'Soak the bread in the mixture created in the first step',
        'Spray a pan with cooking spray',
        'Cook in a pan at medium low temperature',
        'After a minute or two turn it around. If it\'s brownish color it is done, if not after doing the same with the other side turn it around again and cook it for a few more minutes.',
        'Repeat for 4 more breads slices.'
      ],
      calories: 400,
      fat: 19,
      category: firstLetterToUpperCase('breakfast'),
      ratings: 5
    }
    ///////////////
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
          <ion-item lines="none">
            <ion-label>xxx calories</ion-label>
          </ion-item>
          <h3>Macros</h3>
          <ion-list lines="none">
            <ion-item>
              <ion-label>
                xx% Protein
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>xx% Carbs</ion-label>
            </ion-item>
            <ion-item>
              <ion-label>xx% Fat</ion-label>
            </ion-item>
          </ion-list>
          <p>Category: {this.recipe.category}</p>
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
              this.recipe.steps.map(step =>
                <ion-item>
                  <ion-label>{step}</ion-label>
                </ion-item>)
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
