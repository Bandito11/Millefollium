import { newSpecPage } from '@stencil/core/testing';
import { AppRecipeFavorite } from '../app-recipe-favorite';

describe('app-recipe-favorite', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppRecipeFavorite],
      html: `<app-recipe-favorite></app-recipe-favorite>`,
    });
    expect(page.root).toEqualHtml(`
      <app-recipe-favorite>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-recipe-favorite>
    `);
  });
});
