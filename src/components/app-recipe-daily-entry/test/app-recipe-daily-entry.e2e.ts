import { newE2EPage } from '@stencil/core/testing';

describe('app-recipe-daily-entry', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-recipe-daily-entry></app-recipe-daily-entry>');

    const element = await page.find('app-recipe-daily-entry');
    expect(element).toHaveClass('hydrated');
  });
});
