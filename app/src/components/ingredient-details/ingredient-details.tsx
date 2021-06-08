import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'ingredient-details',
  styleUrl: 'ingredient-details.css',
})
export class IngredientDetails {
  @Prop() name;
  @Prop() calories;
  @Prop() carbs;
  @Prop() fat;
  @Prop() protein;
  @Prop() color;
  @Prop() amount;
  render() {
    return (
      <Host>
        <ion-item color={this.color}>
          <ion-label>
            <p class="ion-text-capitalize">Name: {this.name}</p>
            <p class="ion-text-wrap">Amount: {this.amount}</p>
            <p class="ion-text-wrap">Calories: {this.calories}</p>
            <p class="ion-text-wrap">Carbs (g): {this.carbs}</p>
            <p class="ion-text-wrap">Fat (g): {this.fat}</p>
            <p class="ion-text-wrap">Protein (g): {this.protein}</p>
          </ion-label>
        </ion-item>
      </Host>
    );
  }
}
