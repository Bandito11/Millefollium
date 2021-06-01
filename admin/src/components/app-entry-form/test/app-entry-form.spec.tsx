import { newSpecPage } from '@stencil/core/testing';
import { AppEntryForm } from '../app-entry-form';

describe('app-entry-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppEntryForm],
      html: `<app-entry-form></app-entry-form>`,
    });
    expect(page.root).toEqualHtml(`
      <app-entry-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-entry-form>
    `);
  });
});
