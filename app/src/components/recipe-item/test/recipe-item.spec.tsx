import { newSpecPage } from '@stencil/core/testing';
import { RecipeItem } from '../recipe-item';

describe('recipe-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RecipeItem],
      html: `<recipe-item></recipe-item>`,
    });
    expect(page.root).toEqualHtml(`
      <recipe-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </recipe-item>
    `);
  });
});
