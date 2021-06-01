import { newE2EPage } from '@stencil/core/testing';

describe('app-user-profile', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-user-profile></app-user-profile>');

    const element = await page.find('app-user-profile');
    expect(element).toHaveClass('hydrated');
  });
});
