import { newE2EPage } from '@stencil/core/testing';

describe('step-details', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<step-details></step-details>');

    const element = await page.find('step-details');
    expect(element).toHaveClass('hydrated');
  });
});
