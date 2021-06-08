import { newSpecPage } from '@stencil/core/testing';
import { StepDetails } from '../step-details';

describe('step-details', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StepDetails],
      html: `<step-details></step-details>`,
    });
    expect(page.root).toEqualHtml(`
      <step-details>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </step-details>
    `);
  });
});
