import { Component, Host, h, State } from '@stencil/core';
import { IRecipe } from '../../interfaces';

@Component({
  tag: 'app-edit',
  styleUrl: 'app-edit.css'
})
export class AppEdit {
  @State() recipe: IRecipe;

  componentWillLoad() {
    this.recipe = {} as IRecipe;
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
          onIonChange={ev => this.searchForRecipe(ev.detail.value)} debounce={250} show-cancel-button="always">
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
  searchForRecipe(value: string): void {
    console.log('Value.', value);
    this.recipe = {...this.recipe, name: value};
  }

}
