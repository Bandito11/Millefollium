import { Component, Host, h, State } from '@stencil/core';
import { IRecipe } from '../../interfaces';
import { searchForRecipe } from '../../services/recipe.service';

@Component({
  tag: 'app-edit',
  styleUrl: 'app-edit.css'
})
export class AppEdit {
  @State() recipe: IRecipe;

  componentWillLoad() {
    this.recipe = {} as IRecipe;
  }

  async searchRecipe(ev: CustomEvent<import("@ionic/core").SearchbarChangeEventDetail>) {
    const value = ev.detail.value.toLowerCase().trim();
    if (value) {
      try {
        const response = await searchForRecipe(value);
        if (response) {
          response.docs.forEach(data => {
            this.recipe = data.data() as IRecipe;
            this.recipe.id = data.id;
          });
        } else {
          this.recipe = {} as IRecipe;
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      this.recipe = {} as IRecipe;
    }
  }

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Edit Recipe</ion-title>
            <ion-buttons slot="start">
              <ion-back-button defaultHref="/main"></ion-back-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-searchbar
            placeholder="Search for Recipe"
            inputmode="text"
            type="text"
            onIonChange={ev => this.searchRecipe(ev)}
            debounce={250} >
          </ion-searchbar>
          {
            this.recipe.name
              ? <app-entry-form recipe={this.recipe}></app-entry-form>
              : ""
          }
        </ion-content>
      </Host>
    );
  }
}
