import { isPlatform, toastController } from '@ionic/core';
import { Component, Host, h, Prop, State } from '@stencil/core';
import { base64ToURL } from '../../helpers/utils';
import { IRecipe, IIngredient } from '../../interfaces';
import { getImageUrl, postRecipe } from '../../services/recipe.service';

@Component({
  tag: 'app-entry-form',
  styleUrl: 'app-entry-form.css'
})
export class AppEntryForm {

  @State() ingredientsControl: HTMLIonInputElement[];
  @Prop({ mutable: true }) recipe: IRecipe;
  @State() stepsControl: HTMLIonInputElement[];
  file: File;
  image;
  @Prop() header: string;

  componentWillLoad() {
    this.ingredientsControl = [];
    this.stepsControl = [];
    this.image = '';
    if (!this.recipe) {
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
    if (this.recipe.name) {
      this.ifInEdit();
    } else {
      this.ingredientsControl = [this.ingredientInput(this.ingredientsControl.length)];
      this.stepsControl = [this.stepsInput(this.stepsControl.length)];
    }
  }
  async ifInEdit() {
    try {
      this.image = await getImageUrl(this.recipe.image);
    } catch (error) {
      console.error(error);
    }
    this.recipe.ingredients.map((ingredient, index) => this.ingredientsControl = [...this.ingredientsControl, this.ingredientInput(index, ingredient)]);
    this.recipe.steps.map((steps, index) => this.stepsControl = [...this.stepsControl, this.stepsInput(index, steps)]);
  }

  ingredientInput(index, ingredient?: IIngredient) {
    return <div class="ion-padding">
      <p>{index + 1}</p>
      <ion-item>
        <ion-label position="floating">Name</ion-label>
        {
          ingredient
            ? <ion-input id={`edit-ingredient-name-id-${index}`} value={ingredient.name} required={true}></ion-input>
            : <ion-input id={`ingredient-name-id-${index}`} required={true}></ion-input>
        }
      </ion-item>
      <ion-item>
        <ion-label position="floating">Amount</ion-label>
        {
          this.header
            ? <ion-input id={`edit-ingredient-amount-id-${index}`} value={ingredient.amount} required={true}></ion-input>
            : <ion-input id={`ingredient-amount-id-${index}`} required={true}></ion-input>
        }
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

  stepsInput(id, step?: string) {
    return <ion-item>
      <ion-label position="floating">{id + 1}</ion-label>
      {
        this.header
          ? <ion-input id={`edit-steps-id-${id}`} value={step} required={true}></ion-input>
          : <ion-input id={`steps-id-${id}`} required={true}></ion-input>
      }
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
      //TODO:
    } else {
      let chosenPic: HTMLInputElement;
      if (this.header) {
        chosenPic = document.querySelector('#edit-input-file');
      } else {
        chosenPic = document.querySelector('#input-file');
      }
      if (chosenPic.files.length !== 0) {
        this.file = chosenPic.files[0];
        this.recipe = {
          ...this.recipe,
          image: this.file
        }
        this.image = base64ToURL(this.file);
      };
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
    if (this.ingredientsControl.length < 1) {
      const toast = await toastController.create({
        message: `Recipe has to have ingredients.`,
        duration: 500,
        position: 'top',
        color: 'danger'
      });
      toast.present();
      return;
    } else {
      const ingredients: IIngredient[] = [];
      for (let i = 0; i < this.ingredientsControl.length; i++) {
        let name = '';
        let amount = '';
        if (this.header) {
          name = document.querySelector(`#edit-ingredient-name-id-${i}`)['value'];
          amount = document.querySelector(`#edit-ingredient-amount-id-${i}`)['value'];
        } else {
          name = document.querySelector(`#ingredient-name-id-${i}`)['value'];
          amount = document.querySelector(`#ingredient-amount-id-${i}`)['value'];
        }
        if (name && amount) {
          ingredients.push({ name: name, amount: amount })
        }
      }
      this.recipe.ingredients = [...ingredients];
    }
    if (this.stepsControl.length < 1) {
      const toast = await toastController.create({
        message: `Recipe has to have steps.`,
        duration: 500,
        position: 'top',
        color: 'danger'
      });
      toast.present();
      return;
    } else {
      const steps = [];
      for (let i = 0; i < this.stepsControl.length; i++) {
        let step;
        if (this.header) {
          step = document.querySelector(`#edit-steps-id-${i}`)['value'];
        } else {
          step = document.querySelector(`#steps-id-${i}`)['value'];
        }
        if (step) {
          steps.push(step);
        }
      }
      this.recipe.steps = [...steps];
    }

    if (!this.recipe.image) {
      const toast = await toastController.create({
        message: `Recipe has to have an image.`,
        duration: 500,
        position: 'top',
        color: 'danger'
      });
      toast.present();
      return;
    }
    try {
      this.recipe = {
        ...this.recipe,
        name: this.recipe.name.toLowerCase()
      }
      await postRecipe(this.recipe);
      const toast = await toastController.create({
        message: `${this.recipe.name} was created successfully.`,
        duration: 500,
        position: 'top',
        color: 'success'
      });
      toast.present();
    } catch (error) {
      console.error(error);
      const toast = await toastController.create({
        message: error,
        duration: 500,
        position: 'top',
        color: 'danger'
      });
      toast.present();
    }
  }

  render() {
    return (
      <Host>
        <form onSubmit={ev => this.handleSubmit(ev)}>
          <img src={this.image} alt={`Image of ${this.recipe.name}`} />
          <ion-list>
            <div class="create-user-input">
              <ion-button>
                {
                  this.header
                    ? <input id="edit-input-file" class="create-user-input-file" type="file" accept="image/*"
                      onChange={() => this.getPicture()}></input>
                    : <input id="input-file" class="create-user-input-file" type="file" accept="image/*"
                      onChange={() => this.getPicture()}></input>
                }
                <ion-icon slot="icon-only" name="images-outline"></ion-icon>
              </ion-button>
            </div>
            <ion-item>
              <ion-label position="floating">Name</ion-label>
              <ion-input value={this.recipe.name} required={true} type="text"
                onIonInput={ev => this.recipe.name = ev.target['value']}></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Calories</ion-label>
              <ion-input value={this.recipe.calories} required={true} type="text"
                onIonInput={ev => this.recipe.calories = ev.target['value']}></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Fat</ion-label>
              <ion-input value={this.recipe.fat} required={true} type="text"
                onIonInput={ev => this.recipe.fat = ev.target['value']}></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Carbs</ion-label>
              <ion-input value={this.recipe.carbs} required={true} type="text"
                onIonInput={ev => this.recipe.carbs = ev.target['value']}></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Protein</ion-label>
              <ion-input value={this.recipe.protein} required={true} type="text"
                onIonInput={ev => this.recipe.protein = ev.target['value']}></ion-input>
            </ion-item>

            <ion-list lines="none">
              <ion-radio-group name="category" value={this.recipe.category} onIonChange={ev => this.recipe.category = ev.detail.value}>
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
              <ion-textarea value={this.recipe.notes} rows={10} onIonInput={ev => this.recipe.notes = ev.target['value']}></ion-textarea>
            </ion-item>

            <ion-button expand="full" type="submit">Submit</ion-button>
          </ion-list>
        </form>
      </Host>
    );
  }

}
