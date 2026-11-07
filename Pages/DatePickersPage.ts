import { expect, type Locator } from '@playwright/test';
import { Practicepage } from './PracticePage';
export function iso(date: Date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth()+1).padStart(2,'0')}-${String(date.getUTCDate()).padStart(2,'0')}`;
}
export function plusDays(date: Date, days: number) { const next = new Date(date); next.setUTCDate(next.getUTCDate()+days); return next; }
export function displayDate(date: Date) { return date.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric', timeZone:'UTC' }); }
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
/** Target dates are UTC calendar dates, not instants in the machine's local zone. */
export class DatePickersPage extends Practicepage {
  get dob() { return this.page.getByLabel('Date of Birth', { exact: true }); }
  get issued() { return this.page.getByLabel('Passport Issued Date', { exact: true }); }
  get expiry() { return this.page.getByLabel('Passport Expiry Date', { exact: true }); }
  async fillNative(dob: string, issued: string, expiry: string) {
    await this.dob.fill(dob); await this.issued.fill(issued); await this.expiry.fill(expiry); await this.expiry.blur();
  }
  private async navigate(label: Locator, previous: Locator, next: Locator, date: Date) {
    const target = date.getUTCFullYear()*12+date.getUTCMonth();
    for (let attempt=0; attempt<240; attempt++) {
      const text = (await label.innerText()).trim();
      const match = /^(\w+) (\d{4})$/.exec(text);
      if (!match || !monthNames.includes(match[1]!)) throw new Error(`Unexpected month label: ${text}`);
      const current = Number(match[2])*12+monthNames.indexOf(match[1]!);
      if (current === target) return;
      await (current < target ? next : previous).click();
      await expect(label).not.toHaveText(text);
    }
    throw new Error('Calendar navigation exceeded 240 months');
  }
  async pickArrow(date: Date) {
    await this.page.locator('#dp-arrow-input').click();
    await this.navigate(this.page.locator('#dp-arrow-month-label'), this.page.locator('#dp-arrow-prev'), this.page.locator('#dp-arrow-next'), date);
    await this.page.locator(`#dp-arrow-cal [data-date="${iso(date)}"]`).click();
  }
  async pickDropdown(date: Date) {
    await this.page.locator('#dp-dd-month').selectOption(String(date.getUTCMonth()));
    await this.page.locator('#dp-dd-year').selectOption(String(date.getUTCFullYear()));
    await this.page.locator(`#dp-dd-cal [data-date="${iso(date)}"]`).click();
  }
  get bookingMessage() { return this.page.locator('#dp-bk-message'); }
  get checkout() { return this.page.locator('#dp-bk-checkout-val'); }
  get checkin() { return this.page.locator('#dp-bk-checkin-val'); }
  get nights() { return this.page.locator('#dp-bk-nights'); }
  async openBooking() { await this.page.locator('#dp-bk-checkin-field').click(); }
  async pickBooking(date: Date) {
    await this.navigate(this.page.locator('#dp-bk-month-left'), this.page.locator('#dp-bk-prev'), this.page.locator('#dp-bk-next'), date);
    // Scope to the left month so no duplicate day or adjacent-month date is selected.
    await this.page.getByTestId('dp-bk-cal-left').locator(`[data-date="${iso(date)}"]`).click();
  }
}

export function shortDate(date: Date) { return date.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric', timeZone:'UTC' }); }
