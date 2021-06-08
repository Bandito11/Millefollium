import { newSpecPage } from '@stencil/core/testing';
import { UtensilDetails } from '../utensil-details';

describe('utensil-details', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [UtensilDetails],
      html: `<utensil-details></utensil-details>`,
    });
    expect(page.root).toEqualHtml(`
      <utensil-details>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </utensil-details>
    `);
  });
});
