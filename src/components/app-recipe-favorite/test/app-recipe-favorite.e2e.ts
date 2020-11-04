import { newE2EPage } from '@stencil/core/testing';

describe('app-recipe-favorite', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-recipe-favorite></app-recipe-favorite>');

    const element = await page.find('app-recipe-favorite');
    expect(element).toHaveClass('hydrated');
  });
});
