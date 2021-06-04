import { newE2EPage } from '@stencil/core/testing';

describe('app-recipe-daily', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-recipe-daily></app-recipe-daily>');

    const element = await page.find('app-recipe-daily');
    expect(element).toHaveClass('hydrated');
  });
});
