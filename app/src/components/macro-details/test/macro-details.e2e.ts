import { newE2EPage } from '@stencil/core/testing';

describe('macro-details', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<macro-details></macro-details>');

    const element = await page.find('macro-details');
    expect(element).toHaveClass('hydrated');
  });
});
