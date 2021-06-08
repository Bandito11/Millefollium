import { newE2EPage } from '@stencil/core/testing';

describe('ingredients-inputs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ingredients-inputs></ingredients-inputs>');

    const element = await page.find('ingredients-inputs');
    expect(element).toHaveClass('hydrated');
  });
});
