import { newE2EPage } from '@stencil/core/testing';

describe('app-recipe-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-recipe-list></app-recipe-list>');

    const element = await page.find('app-recipe-list');
    expect(element).toHaveClass('hydrated');
  });
});
