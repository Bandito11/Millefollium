import { newE2EPage } from '@stencil/core/testing';

describe('steps-inputs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<steps-inputs></steps-inputs>');

    const element = await page.find('steps-inputs');
    expect(element).toHaveClass('hydrated');
  });
});
