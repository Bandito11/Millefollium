import { newE2EPage } from '@stencil/core/testing';

describe('app-recipe-info', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-recipe-info></app-recipe-info>');

    const element = await page.find('app-recipe-info');
    expect(element).toHaveClass('hydrated');
  });
});
