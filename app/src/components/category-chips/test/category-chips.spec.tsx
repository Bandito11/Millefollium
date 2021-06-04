import { newSpecPage } from '@stencil/core/testing';
import { CategoryChips } from '../category-chips';

describe('category-chips', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CategoryChips],
      html: `<category-chips></category-chips>`,
    });
    expect(page.root).toEqualHtml(`
      <category-chips>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </category-chips>
    `);
  });
});
