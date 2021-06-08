import { newSpecPage } from '@stencil/core/testing';
import { UtensilsInputs } from '../utensils-inputs';

describe('utensils-inputs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [UtensilsInputs],
      html: `<utensils-inputs></utensils-inputs>`,
    });
    expect(page.root).toEqualHtml(`
      <utensils-inputs>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </utensils-inputs>
    `);
  });
});
