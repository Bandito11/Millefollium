import { newE2EPage } from '@stencil/core/testing';

describe('app-recipe-edit', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-recipe-edit></app-recipe-edit>');

    const element = await page.find('app-recipe-edit');
    expect(element).toHaveClass('hydrated');
  });
});
