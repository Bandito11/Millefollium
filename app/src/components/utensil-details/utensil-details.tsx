import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'utensil-details',
  styleUrl: 'utensil-details.css',
})
export class UtensilDetails {
  @Prop() utensil;
  @Prop() color;

  render() {
    return (
      <Host>
        <ion-item color={this.color}>
          <ion-label>
            <p class="ion-text-capitalize">{this.utensil}</p>
          </ion-label>
        </ion-item>
      </Host>
    );
  }
}
