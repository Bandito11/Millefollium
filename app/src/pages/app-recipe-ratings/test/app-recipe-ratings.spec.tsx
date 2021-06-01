import { newSpecPage } from '@stencil/core/testing';
import { AppRecipeRatings } from '../app-recipe-ratings';

describe('app-recipe-ratings', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppRecipeRatings],
      html: `<app-recipe-ratings></app-recipe-ratings>`,
    });
    expect(page.root).toEqualHtml(`
      <app-recipe-ratings>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-recipe-ratings>
    `);
  });
});
