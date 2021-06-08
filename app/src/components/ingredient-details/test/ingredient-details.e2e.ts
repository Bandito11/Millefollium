import { newE2EPage } from '@stencil/core/testing';

describe('ingredient-details', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ingredient-details></ingredient-details>');

    const element = await page.find('ingredient-details');
    expect(element).toHaveClass('hydrated');
  });
});
