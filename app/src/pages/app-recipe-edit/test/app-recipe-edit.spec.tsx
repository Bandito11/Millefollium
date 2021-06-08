import { newSpecPage } from '@stencil/core/testing';
import { AppRecipeEdit } from '../app-recipe-edit';

describe('app-recipe-edit', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppRecipeEdit],
      html: `<app-recipe-edit></app-recipe-edit>`,
    });
    expect(page.root).toEqualHtml(`
      <app-recipe-edit>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-recipe-edit>
    `);
  });
});
