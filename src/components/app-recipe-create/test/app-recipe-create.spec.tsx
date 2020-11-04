import { newSpecPage } from '@stencil/core/testing';
import { AppRecipeCreate } from '../app-recipe-create';

describe('app-recipe-create', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppRecipeCreate],
      html: `<app-recipe-create></app-recipe-create>`,
    });
    expect(page.root).toEqualHtml(`
      <app-recipe-create>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-recipe-create>
    `);
  });
});
