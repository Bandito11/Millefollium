import { newSpecPage } from '@stencil/core/testing';
import { RecipeInputs } from '../recipe-inputs';

describe('recipe-inputs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RecipeInputs],
      html: `<recipe-inputs></recipe-inputs>`,
    });
    expect(page.root).toEqualHtml(`
      <recipe-inputs>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </recipe-inputs>
    `);
  });
});
