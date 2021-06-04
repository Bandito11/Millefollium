import { newE2EPage } from '@stencil/core/testing';

describe('category-chips', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<category-chips></category-chips>');

    const element = await page.find('category-chips');
    expect(element).toHaveClass('hydrated');
  });
});
