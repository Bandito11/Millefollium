import { newSpecPage } from '@stencil/core/testing';
import { AppMain } from '../app-main';

describe('app-main', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppMain],
      html: `<app-main></app-main>`,
    });
    expect(page.root).toEqualHtml(`
      <app-main>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-main>
    `);
  });
});
