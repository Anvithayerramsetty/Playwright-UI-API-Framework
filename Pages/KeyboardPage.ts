import { expect } from '@playwright/test';
import { Practicepage } from './PracticePage';
export class KeyboardPage extends Practicepage {
  async selectAutomation() {
    await this.page.getByTestId('keyboard-option-qa').click();
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
  }
  async enterSecret() { await this.page.locator('#keyboard-secret-input').pressSequentially('PLAYWRIGHT'); }
  async copyWithKeyboard() {
    const source = this.page.locator('#keyboard-copy-source');
    const value = await source.inputValue();
    await source.focus();
    await this.page.keyboard.press('ControlOrMeta+A');
    await this.page.keyboard.press('ControlOrMeta+C');
    await this.page.keyboard.press('Tab');
    await expect(this.page.locator('#keyboard-copy-destination')).toBeFocused();
    await this.page.keyboard.press('ControlOrMeta+V');
    return value;
  }
  async summarize() { await this.page.getByRole('button', { name: 'Generate Summary', exact: true }).click(); }
}
