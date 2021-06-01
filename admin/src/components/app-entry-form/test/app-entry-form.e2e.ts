import { newE2EPage } from '@stencil/core/testing';

describe('app-entry-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-entry-form></app-entry-form>');

    const element = await page.find('app-entry-form');
    expect(element).toHaveClass('hydrated');
  });
});
