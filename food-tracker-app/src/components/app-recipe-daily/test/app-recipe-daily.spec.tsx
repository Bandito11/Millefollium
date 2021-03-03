import { newSpecPage } from '@stencil/core/testing';
import { AppRecipeDaily } from '../app-recipe-daily';

describe('app-recipe-daily', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppRecipeDaily],
      html: `<app-recipe-daily></app-recipe-daily>`,
    });
    expect(page.root).toEqualHtml(`
      <app-recipe-daily>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-recipe-daily>
    `);
  });
});
