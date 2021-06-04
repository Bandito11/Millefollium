import { Component, Host, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'category-chips',
  styleUrl: 'category-chips.css',
})
export class CategoryChips {
  @Event() categoryCompleted: EventEmitter<string>;
 
  categoryHandler(category: string) {
    this.setColor(category);
    this.categoryCompleted.emit(category);
  }

  setColor(category: string) {
    let chips = document.querySelectorAll<HTMLIonChipElement>(`ion-chip`);
    chips.forEach((item) => (item.color = 'dark'));
    let chip = document.querySelector<HTMLIonChipElement>(`#${category}`);
    chip.color = 'secondary';
  }

  render() {
    return (
      <Host>
        <ion-chip
          id="breakfast"
          onClick={() => this.categoryHandler('breakfast')}
        >
          <ion-label>Breakfast</ion-label>
        </ion-chip>
        <ion-chip id="lunch" onClick={() => this.categoryHandler('lunch')}>
          <ion-label>Lunch</ion-label>
        </ion-chip>
        <ion-chip id="dinner" onClick={() => this.categoryHandler('dinner')}>
          <ion-label>Dinner</ion-label>
        </ion-chip>
        <ion-chip id="snack" onClick={() => this.categoryHandler('snack')}>
          <ion-label>Snack</ion-label>
        </ion-chip>
        <ion-chip id="dessert" onClick={() => this.categoryHandler('dessert')}>
          <ion-label>Dessert</ion-label>
        </ion-chip>
        <ion-chip
          id="favorites"
          onClick={() => this.categoryHandler('favorites')}
        >
          <ion-label>Favorites</ion-label>
        </ion-chip>
        <ion-chip
          id="none"
          color="secondary"
          onClick={() => this.categoryHandler('none')}
        >
          <ion-label>None</ion-label>
        </ion-chip>
      </Host>
    );
  }
}
