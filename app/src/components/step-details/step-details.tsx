import { Component, Host, h, Prop } from '@stencil/core';
import { capitalizeFirstLetter } from '../../helpers/utils';

@Component({
  tag: 'step-details',
  styleUrl: 'step-details.css',
})
export class StepDetails {
  @Prop() color: string;
  @Prop() step: string;

  render() {
    return (
      <Host>
        <ion-item color={this.color}>
          <ion-label id="steps" class="ion-text-wrap">
            <p>{capitalizeFirstLetter(this.step)}</p>
          </ion-label>
        </ion-item>
      </Host>
    );
  }
}
