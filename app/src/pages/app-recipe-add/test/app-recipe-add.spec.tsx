import { newSpecPage } from '@stencil/core/testing';
import { AppRecipeAdd } from '../app-recipe-add';

describe('app-recipe-add', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppRecipeAdd],
      html: `<app-recipe-add></app-recipe-add>`,
    });
    expect(page.root).toEqualHtml(`
      <app-recipe-add>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-recipe-add>
    `);
  });
});
