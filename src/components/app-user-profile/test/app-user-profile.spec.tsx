import { newSpecPage } from '@stencil/core/testing';
import { AppUserProfile } from '../app-user-profile';

describe('app-user-profile', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppUserProfile],
      html: `<app-user-profile></app-user-profile>`,
    });
    expect(page.root).toEqualHtml(`
      <app-user-profile>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-user-profile>
    `);
  });
});
