import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'macro-details',
  styleUrl: 'macro-details.css'
})
export class MacroDetails {
  @Prop() carbs;
  @Prop()fat;
  @Prop() protein;

  render() {
    return (
      <Host>
        <ion-item>
              <ion-label>
                <p>Carbs (g): {this.carbs}</p>
                <p>Fat (g): {this.fat}</p>
                <p>Protein (g): {this.protein}</p>
              </ion-label>
            </ion-item>
      </Host>
    );
  }

}
