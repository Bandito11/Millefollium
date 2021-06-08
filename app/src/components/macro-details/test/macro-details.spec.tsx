import { newSpecPage } from '@stencil/core/testing';
import { MacroDetails } from '../macro-details';

describe('macro-details', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MacroDetails],
      html: `<macro-details></macro-details>`,
    });
    expect(page.root).toEqualHtml(`
      <macro-details>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </macro-details>
    `);
  });
});
