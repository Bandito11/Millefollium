import { Component, Host, h, Prop } from '@stencil/core';
import { capitalizeAllFirstLetters } from '../../helpers/utils';

@Component({
  tag: 'recipe-item',
  styleUrl: 'recipe-item.css'
})
export class RecipeItem {
  @Prop() name: string;
  @Prop() calories: number;
  @Prop() image: string;
  render() {
    return (
      <Host>
        <ion-item>
          {/* <ion-thumbnail slot="start">
            <ion-img src={this.image} ></ion-img>
          </ion-thumbnail> */}
          <ion-label>
            <h2>{capitalizeAllFirstLetters(this.name)}</h2>
            <h3>
              <slot name="category"></slot>
            </h3>
            <h3>{this.calories} calories</h3>
            <slot name="buttons"></slot>
          </ion-label>
        </ion-item>
      </Host>
    );
  }

}
