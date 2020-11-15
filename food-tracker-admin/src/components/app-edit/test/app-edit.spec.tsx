import { newSpecPage } from '@stencil/core/testing';
import { AppEdit } from '../app-edit';

describe('app-edit', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppEdit],
      html: `<app-edit></app-edit>`,
    });
    expect(page.root).toEqualHtml(`
      <app-edit>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-edit>
    `);
  });
});
