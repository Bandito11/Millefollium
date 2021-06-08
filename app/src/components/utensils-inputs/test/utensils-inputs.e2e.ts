import { newE2EPage } from '@stencil/core/testing';

describe('utensils-inputs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<utensils-inputs></utensils-inputs>');

    const element = await page.find('utensils-inputs');
    expect(element).toHaveClass('hydrated');
  });
});
