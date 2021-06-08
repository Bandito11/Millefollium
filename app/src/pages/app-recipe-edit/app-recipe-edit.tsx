import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-recipe-edit',
  styleUrl: 'app-recipe-edit.css',
  shadow: true,
})
export class AppRecipeEdit {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
