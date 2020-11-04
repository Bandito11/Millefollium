import { newSpecPage } from '@stencil/core/testing';
import { AppRecipeList } from '../app-recipe-list';

describe('app-recipe-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppRecipeList],
      html: `<app-recipe-list></app-recipe-list>`,
    });
    expect(page.root).toEqualHtml(`
      <app-recipe-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-recipe-list>
    `);
  });
});
