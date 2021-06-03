// import { toastController } from '@ionic/core';
import { Component, Host, h, Prop } from '@stencil/core';
// import { findRatingsIndex } from '../../workers/find-ratings-index.worker';
// import { rateRecipe } from '../../services/recipe';
// import { getCurrentUserId } from '../../services/user-profile';
import { IRecipe } from '../../interfaces/IRecipe';

@Component({
  tag: 'app-recipe-ratings',
  styleUrl: 'app-recipe-ratings.css'
})
export class AppRecipeRatings {
  @Prop({ mutable: true }) recipe: IRecipe;
  @Prop() canEdit: boolean;

  componentWillLoad() {
    this.canEdit = false;
  }

  async userRated(rating: number) {
    rating
    // try {
    //   const id = await getCurrentUserId();
    //   if (id) {
    //     const indexFound = await findRatingsIndex({id: id, recipe: this.recipe});
    //     if (indexFound > -1) {
    //       this.recipe.ratings[indexFound].rating = rating;
    //     } else {
    //       this.recipe.ratings.push({ id: id, rating: rating });
    //     }
    //     const res = await rateRecipe(this.recipe);
    //     const toast = await toastController.create({
    //       message: `${this.recipe.name} was rated!`,
    //       duration: 1000,
    //       color: 'success'
    //     });
    //     toast.present();
    //     this.recipe = {
    //       ...res
    //     }
    //   } else {
    //     const toast = await toastController.create({
    //       message: `User can't rate a recipe unless he's logged in.`,
    //       duration: 1000,
    //       color: 'danger'
    //     });
    //     toast.present();
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  }

  render() {
    return (
      <Host>
        <div>
          {
            this.recipe.averageRating <= 0
              ? <ion-icon onClick={() => this.userRated(1)} slot="ratings" name="star-outline"></ion-icon>
              : this.recipe.averageRating > 0 && this.recipe.averageRating < 1
                ? <ion-icon onClick={() => this.userRated(1)} name="star-half-outline"></ion-icon>
                : <ion-icon onClick={() => this.userRated(1)} slot="ratings" name="star-sharp"></ion-icon>
          }
          {
            this.recipe.averageRating <= 1
              ? <ion-icon onClick={() => this.userRated(2)} slot="ratings" name="star-outline"></ion-icon>
              : this.recipe.averageRating > 1 && this.recipe.averageRating < 2
                ? <ion-icon onClick={() => this.userRated(2)} name="star-half-outline"></ion-icon>
                : <ion-icon onClick={() => this.userRated(2)} slot="ratings" name="star-sharp"></ion-icon>
          }
          {
            this.recipe.averageRating <= 2
              ? <ion-icon onClick={() => this.userRated(3)} slot="ratings" name="star-outline"></ion-icon>
              : this.recipe.averageRating > 2 && this.recipe.averageRating < 3
                ? <ion-icon onClick={() => this.userRated(3)} name="star-half-outline"></ion-icon>
                : <ion-icon onClick={() => this.userRated(3)} slot="ratings" name="star-sharp"></ion-icon>
          }
          {
            this.recipe.averageRating <= 3
              ? <ion-icon onClick={() => this.userRated(4)} slot="ratings" name="star-outline"></ion-icon>
              : this.recipe.averageRating > 3 && this.recipe.averageRating < 4
                ? <ion-icon onClick={() => this.userRated(4)} name="star-half-outline"></ion-icon>
                : <ion-icon onClick={() => this.userRated(4)} slot="ratings" name="star-sharp"></ion-icon>
          }
          {
            this.recipe.averageRating <= 4
              ? <ion-icon onClick={() => this.userRated(5)} slot="ratings" name="star-outline"></ion-icon>
              : this.recipe.averageRating > 4 && this.recipe.averageRating < 5
                ? <ion-icon onClick={() => this.userRated(5)} name="star-half-outline"></ion-icon>
                : <ion-icon onClick={() => this.userRated(5)} slot="ratings" name="star-sharp"></ion-icon>
          }
        </div>
      </Host>
    );
  }

}
