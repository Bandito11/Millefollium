import { newE2EPage } from '@stencil/core/testing';

describe('utensil-details', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<utensil-details></utensil-details>');

    const element = await page.find('utensil-details');
    expect(element).toHaveClass('hydrated');
  });
});
