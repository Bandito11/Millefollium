import { newSpecPage } from '@stencil/core/testing';
import { IngredientsInputs } from '../ingredients-inputs';

describe('ingredients-inputs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IngredientsInputs],
      html: `<ingredients-inputs></ingredients-inputs>`,
    });
    expect(page.root).toEqualHtml(`
      <ingredients-inputs>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ingredients-inputs>
    `);
  });
});
