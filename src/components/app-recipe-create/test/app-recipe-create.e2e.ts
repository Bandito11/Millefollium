import { newE2EPage } from '@stencil/core/testing';

describe('app-recipe-create', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-recipe-create></app-recipe-create>');

    const element = await page.find('app-recipe-create');
    expect(element).toHaveClass('hydrated');
  });
});
