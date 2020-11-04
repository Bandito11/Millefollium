import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-recipe-create',
  styleUrl: 'app-recipe-create.css',
  shadow: true,
})
export class AppRecipeCreate {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
