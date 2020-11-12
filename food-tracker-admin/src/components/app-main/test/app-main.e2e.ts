import { newE2EPage } from '@stencil/core/testing';

describe('app-main', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-main></app-main>');

    const element = await page.find('app-main');
    expect(element).toHaveClass('hydrated');
  });
});
