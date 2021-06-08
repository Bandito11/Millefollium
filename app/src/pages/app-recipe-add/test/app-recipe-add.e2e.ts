import { newE2EPage } from '@stencil/core/testing';

describe('app-recipe-add', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-recipe-add></app-recipe-add>');

    const element = await page.find('app-recipe-add');
    expect(element).toHaveClass('hydrated');
  });
});
