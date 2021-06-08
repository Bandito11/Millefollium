import { newE2EPage } from '@stencil/core/testing';

describe('recipe-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<recipe-item></recipe-item>');

    const element = await page.find('recipe-item');
    expect(element).toHaveClass('hydrated');
  });
});
