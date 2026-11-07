import { type Page } from '@playwright/test';
export class DatasetLabPage {
  constructor(readonly page: Page) {}
  async download() {
    const [download] = await Promise.all([this.page.waitForEvent('download'), this.page.locator('#btn-download-dataset').click()]);
    return download;
  }
  async reset() { await this.page.locator('#btn-reset-dataset').click(); }
}
