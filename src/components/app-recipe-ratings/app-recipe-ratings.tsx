import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-recipe-ratings',
  styleUrl: 'app-recipe-ratings.css'
})
export class AppRecipeRatings {
  @Prop() ratings: number;

  @Prop() canEdit: boolean;

  componentWillLoad() {
    this.canEdit = false;
  }

  render() {
    return (
      <Host>
        <div>
          {
            this.ratings <= 0
              ? <ion-icon slot="ratings" name="star-outline"></ion-icon>
              : this.ratings > 0 && this.ratings < 1
                ? <ion-icon name="star-half-outline"></ion-icon>
                : <ion-icon slot="ratings" name="star-sharp"></ion-icon>
          }
          {
            this.ratings <= 1
              ? <ion-icon slot="ratings" name="star-outline"></ion-icon>
              : this.ratings > 1 && this.ratings < 2
                ? <ion-icon name="star-half-outline"></ion-icon>
                : <ion-icon slot="ratings" name="star-sharp"></ion-icon>
          }
          {
            this.ratings <= 2
              ? <ion-icon slot="ratings" name="star-outline"></ion-icon>
              : this.ratings > 2 && this.ratings < 3
                ? <ion-icon name="star-half-outline"></ion-icon>
                : <ion-icon slot="ratings" name="star-sharp"></ion-icon>
          }
          {
            this.ratings <= 3
              ? <ion-icon slot="ratings" name="star-outline"></ion-icon>
              : this.ratings > 3 && this.ratings < 4
                ? <ion-icon name="star-half-outline"></ion-icon>
                : <ion-icon slot="ratings" name="star-sharp"></ion-icon>
          }
          {
            this.ratings <= 4
              ? <ion-icon slot="ratings" name="star-outline"></ion-icon>
              : this.ratings > 4 && this.ratings < 5
                ? <ion-icon name="star-half-outline"></ion-icon>
                : <ion-icon slot="ratings" name="star-sharp"></ion-icon>
          }
        </div>
      </Host>
    );
  }

}
