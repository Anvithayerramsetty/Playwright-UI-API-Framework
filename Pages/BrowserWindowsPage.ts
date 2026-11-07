import { expect, type Locator, type Page } from '@playwright/test';
import { Practicepage } from './PracticePage';
export class BrowserWindowsPage extends Practicepage {
  button(name: string) { return this.page.getByRole('button', { name, exact: true }); }
  async openPopup(trigger: Locator): Promise<Page> {
    const [popup] = await Promise.all([this.page.waitForEvent('popup'), trigger.click()]);
    return popup; // Caller checks the expected destination and closes it in finally.
  }
  async withPopups(trigger: Locator, count: number, verify: (pages: Page[]) => Promise<void>) {
    const opened: Page[] = [];
    const capture = (popup: Page) => { opened.push(popup); };
    this.page.on('popup', capture);
    try {
      await trigger.click();
      await expect.poll(() => opened.length).toBe(count);
      await verify(opened);
      expect(opened).toHaveLength(count);
    } finally {
      this.page.off('popup', capture);
      await Promise.all(opened.filter(p => !p.isClosed()).map(p => p.close()));
    }
  }
  async login(email: string, password: string) {
    const popup = await this.openPopup(this.button('Open Login Window'));
    try {
      await popup.getByLabel('Email', { exact: true }).fill(email);
      await popup.getByLabel('Password', { exact: true }).fill(password);
      await Promise.all([popup.waitForEvent('close'), popup.getByRole('button', { name: 'Login', exact: true }).click()]);
    } finally { if (!popup.isClosed()) await popup.close(); }
  }
}
