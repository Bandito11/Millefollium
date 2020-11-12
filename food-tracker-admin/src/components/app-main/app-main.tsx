import { isPlatform, toastController } from '@ionic/core';
import { Component, Host, h, State } from '@stencil/core';
import { base64ToURL } from '../../helpers/utils';
import { IIngredient, IRecipe } from '../../interfaces';
import { logoutOfAPI } from '../../services/auth.service';
import { postRecipe } from '../../services/recipe.service';

@Component({
  tag: 'app-main',
  styleUrl: 'app-main.css'
})
export class AppMain {
  @State() ingredientsControl: HTMLIonInputElement[];
  @State() recipe: IRecipe;
  @State() stepsControl: HTMLIonInputElement[];
  file: File;
  image: string;

  componentWillLoad() {
    this.ingredientsControl = [this.ingredientInput(0)];
    this.stepsControl = [this.stepsInput(0)];
    this.recipe = {
      name: '',
      calories: 0,
      image: null,
      ingredients: [],
      fat: 0,
      protein: 0,
      carbs: 0,
      steps: [],
      category: 'breakfast',
      averageRating: 0,
      ratings: [],
      notes: ''

    }

  }

  ingredientInput(index) {
    return <div class="ion-padding">
      <p>{index}</p>
      <ion-item>
        <ion-label position="floating">Name</ion-label>
        <ion-input id={`ingredient-name-id-${index}`} required={true}>
        </ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Amount</ion-label>
        <ion-input id={`ingredient-amount-id-${index}`} required={true}>
        </ion-input>
      </ion-item>
    </div>
  }

  addToIngredientControl(index) {
    this.ingredientsControl = [
      ...this.ingredientsControl,
      this.ingredientInput(index)
    ]
  }

  removeFromIngredientControl(): void {
    this.ingredientsControl.pop();
    this.ingredientsControl = [...this.ingredientsControl];
  }

  stepsInput(id) {
    return <ion-item>
      <ion-label position="floating">{id}</ion-label>
      <ion-input id={`steps-id-${id}`} required={true}>
      </ion-input>
    </ion-item>
  }
  addToStepsControl(index) {
    this.stepsControl = [
      ...this.stepsControl,
      this.stepsInput(index)
    ];
  }

  getPicture(): void {
    if (isPlatform('capacitor')) {

    } else {
      const chosenPic: HTMLInputElement = document.querySelector('#create-user-input-file');
      if (chosenPic.files.length !== 0) {
        this.file = chosenPic.files[0];
        this.recipe = {
          ...this.recipe,
          image: this.file
        }
      };
      this.image = base64ToURL(this.file);
    }
  }

  removeFromStepsControl(): void {
    this.stepsControl.pop();
    this.stepsControl = [...this.stepsControl];
  }

  async handleSubmit(ev: Event) {
    if (ev) {
      ev.preventDefault();
    }
    console.log(this.recipe.category)
    if (this.ingredientsControl.length < 1) {
      const toast = await toastController.create({
        message: `Recipe has to have ingredients.`,
        duration: 1000,
        color: 'danger'
      });
      toast.present();
      return;
    } else {
      const ingredients: IIngredient[] = [];
      for (let i = 0; i < this.ingredientsControl.length; i++) {
        const name = document.querySelector(`#ingredient-name-id-${i}`)['value'];
        const amount = document.querySelector(`#ingredient-amount-id-${i}`)['value'];
        ingredients.push({ name: name, amount: amount })
      }
      this.recipe.ingredients = [...ingredients];
    }
    if (this.stepsControl.length < 1) {
      const toast = await toastController.create({
        message: `Recipe has to have steps.`,
        duration: 1000,
        color: 'danger'
      });
      toast.present();
      return;
    } else {
      const steps = [];
      for (let i = 0; i < this.stepsControl.length; i++) {
        steps.push(document.querySelector(`#steps-id-${i}`)['value']);
      }
      this.recipe.steps = [...steps];
    }

    if (!this.recipe.image) {
      const toast = await toastController.create({
        message: `Recipe has to have an image.`,
        duration: 1000,
        color: 'danger'
      });
      toast.present();
      return;
    }
    try {
      await postRecipe(this.recipe);
      const toast = await toastController.create({
        message: `${this.recipe.name} was created successfully.`,
        duration: 1000,
        color: 'success'
      });
      toast.present();
    } catch (error) {
      console.error(error);
      const toast = await toastController.create({
        message: error,
        duration: 1000,
        color: 'danger'
      });
      toast.present();
    }
  }

  async logout() {
    try {
      const res = await logoutOfAPI();
      let message = ''
      if (res) {
        message = 'User was signed out.'
      } else {
        message = 'There was an error. User was not signed in.'
      }
      const toast = await toastController.create({
        message: message,
        duration: 1000,
      });
      toast.present();
    } catch (error) {
      console.error(error);
      const router = document.querySelector('ion-router');
      router.back();
      const toast = await toastController.create({
        message: 'User logged out.',
        duration: 1000,
      });
      toast.present();
    }
  }

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Main Page</ion-title>
            <ion-buttons slot="start" onClick={() => this.logout()}>
              <ion-button>
                <ion-icon slot="icon-only" name="log-out-outline"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <form onSubmit={ev => this.handleSubmit(ev)}>
            <img src={this.image} alt={`Image of ${this.recipe.name}`} />
            <ion-list>
              <div id="create-user-input">
                <ion-button>
                  <input id="create-user-input-file" type="file" accept="image/*"
                    onChange={() => this.getPicture()}></input>
                  <ion-icon slot="icon-only" name="images-outline"></ion-icon>
                </ion-button>
              </div>
              <ion-item>
                <ion-label position="floating">Name</ion-label>
                <ion-input required={true} type="text"
                  onIonInput={ev => this.recipe.name = ev.target['value']}></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Calories</ion-label>
                <ion-input required={true} type="text"
                  onIonInput={ev => this.recipe.calories = ev.target['value']}></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Fat</ion-label>
                <ion-input required={true} type="text"
                  onIonInput={ev => this.recipe.fat = ev.target['value']}></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Carbs</ion-label>
                <ion-input required={true} type="text"
                  onIonInput={ev => this.recipe.carbs = ev.target['value']}></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Protein</ion-label>
                <ion-input required={true} type="text"
                  onIonInput={ev => this.recipe.protein = ev.target['value']}></ion-input>
              </ion-item>

              <ion-list lines="none">
                <ion-radio-group name="category" value="breakfast" onIonChange={ev => this.recipe.category = ev.detail.value}>
                  <ion-list-header>
                    <ion-label>Category</ion-label>
                  </ion-list-header>
                  <ion-item>
                    <ion-label>Breakfast</ion-label>
                    <ion-radio value="breakfast"></ion-radio>
                  </ion-item>
                  <ion-item>
                    <ion-label>Lunch</ion-label>
                    <ion-radio value="lunch"></ion-radio>
                  </ion-item>
                  <ion-item>
                    <ion-label>Dinner</ion-label>
                    <ion-radio value="dinner"></ion-radio>
                  </ion-item>
                  <ion-item>
                    <ion-label>Dessert</ion-label>
                    <ion-radio value="dessert"></ion-radio>
                  </ion-item>
                  <ion-item>
                    <ion-label>Snack</ion-label>
                    <ion-radio value="snack"></ion-radio>
                  </ion-item>
                </ion-radio-group>
              </ion-list>

              <ion-list>
                <ion-list-header>
                  <ion-label>Ingredients</ion-label>
                </ion-list-header>
                {this.ingredientsControl.map(ingredientControl => ingredientControl)}
                <ion-item>
                  <ion-button onClick={() => this.addToIngredientControl(this.ingredientsControl.length)}>
                    Add Ingredient
              </ion-button>
                  <ion-button onClick={() => this.removeFromIngredientControl()}>
                    Remove Ingredient
              </ion-button>
                </ion-item>
              </ion-list>

              <ion-list>
                <ion-list-header>
                  <ion-label>Steps</ion-label>
                </ion-list-header>
                {this.stepsControl.map(stepsControl => stepsControl)}
                <div class="ion-padding">
                  <ion-button size="small" onClick={() => this.addToStepsControl(this.stepsControl.length)}>
                    Add step
              </ion-button>
                  <ion-button size="small" onClick={() => this.removeFromStepsControl()}>
                    Remove step
              </ion-button>
                </div>
              </ion-list>

              <ion-item>
                <ion-label position="floating">Extra Notes</ion-label>
                <ion-textarea rows={10} onIonInput={ev => this.recipe.notes = ev.target['value']}></ion-textarea>
              </ion-item>

              <ion-button expand="full" type="submit">Submit</ion-button>
            </ion-list>
          </form>
        </ion-content>
      </Host>
    );
  }
}

