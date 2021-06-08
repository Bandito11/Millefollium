import { newE2EPage } from '@stencil/core/testing';

describe('recipe-inputs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<recipe-inputs></recipe-inputs>');

    const element = await page.find('recipe-inputs');
    expect(element).toHaveClass('hydrated');
  });
});
