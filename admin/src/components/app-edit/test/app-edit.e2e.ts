import { newE2EPage } from '@stencil/core/testing';

describe('app-edit', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-edit></app-edit>');

    const element = await page.find('app-edit');
    expect(element).toHaveClass('hydrated');
  });
});
