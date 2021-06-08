import { newSpecPage } from '@stencil/core/testing';
import { IngredientDetails } from '../ingredient-details';

describe('ingredient-details', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IngredientDetails],
      html: `<ingredient-details></ingredient-details>`,
    });
    expect(page.root).toEqualHtml(`
      <ingredient-details>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ingredient-details>
    `);
  });
});
