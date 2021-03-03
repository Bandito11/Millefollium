import { newSpecPage } from '@stencil/core/testing';
import { AppRecipeInfo } from '../app-recipe-info';

describe('app-recipe-info', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppRecipeInfo],
      html: `<app-recipe-info></app-recipe-info>`,
    });
    expect(page.root).toEqualHtml(`
      <app-recipe-info>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-recipe-info>
    `);
  });
});
