import { newE2EPage } from '@stencil/core/testing';

describe('app-recipe-ratings', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-recipe-ratings></app-recipe-ratings>');

    const element = await page.find('app-recipe-ratings');
    expect(element).toHaveClass('hydrated');
  });
});
