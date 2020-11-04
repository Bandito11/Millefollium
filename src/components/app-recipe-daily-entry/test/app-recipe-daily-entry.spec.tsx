import { newSpecPage } from '@stencil/core/testing';
import { AppRecipeDailyEntry } from '../app-recipe-daily-entry';

describe('app-recipe-daily-entry', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppRecipeDailyEntry],
      html: `<app-recipe-daily-entry></app-recipe-daily-entry>`,
    });
    expect(page.root).toEqualHtml(`
      <app-recipe-daily-entry>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-recipe-daily-entry>
    `);
  });
});
