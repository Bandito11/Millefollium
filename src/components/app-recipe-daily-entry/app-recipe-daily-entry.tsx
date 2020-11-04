import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-recipe-daily-entry',
  styleUrl: 'app-recipe-daily-entry.css',
  shadow: true,
})
export class AppRecipeDailyEntry {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
