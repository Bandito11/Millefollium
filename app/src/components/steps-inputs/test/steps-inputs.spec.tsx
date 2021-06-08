import { newSpecPage } from '@stencil/core/testing';
import { StepsInputs } from '../steps-inputs';

describe('steps-inputs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StepsInputs],
      html: `<steps-inputs></steps-inputs>`,
    });
    expect(page.root).toEqualHtml(`
      <steps-inputs>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </steps-inputs>
    `);
  });
});
