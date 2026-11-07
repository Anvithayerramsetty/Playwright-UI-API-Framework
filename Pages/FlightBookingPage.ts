import { expect } from '@playwright/test';
import { Practicepage } from './PracticePage';
import { TableComponent, numberCell } from './TableComponent';
export class FlightBookingPage extends Practicepage {
  get table() { return new TableComponent(this.page.locator('#flight-table')); }
  get selected() { return this.page.locator('#flight-selected-info'); }
  get confirmation() { return this.page.locator('#flight-success-banner'); }
  get detail() { return this.page.locator('#flight-success-detail'); }
  get reference() { return this.page.locator('#flight-booking-ref'); }
  async search(departure: string, destination: string) {
    await this.page.getByLabel('Departure', { exact: true }).selectOption({ label: departure });
    await this.page.getByLabel('Destination', { exact: true }).selectOption({ label: destination });
    await this.page.getByRole('button', { name: 'Find Flights', exact: true }).click();
  }
  async offers() {
    return (await this.table.records()).map(row => {
      const key = Object.keys(row).find(k => /price|fare/.test(k));
      if (!key || !row.airline) throw new Error('Missing price or airline header');
      // Contract: this demo uses USD with optional comma grouping, not locale decimal commas.
      const text = row[key]!;
      if (!/^\$\d+(?:,\d{3})*(?:\.\d{1,2})?$/.test(text)) throw new Error(`Invalid USD fare: ${text}`);
      return { airline: row.airline, price: numberCell(text.slice(1).replaceAll(',', '')) };
    });
  }
  async selectCheapest() {
    const offers = await this.offers();
    const chosen = offers.reduce((a, b) => b.price < a.price ? b : a);
    const row = this.table.rows.filter({ has: this.page.getByRole('cell', { name: chosen.airline, exact: true }) });
    await expect(row).toHaveCount(1);
    await row.getByRole('button', { name: 'Book', exact: true }).click();
    return chosen; // Equal fares select the first offer; airline must uniquely identify a row.
  }
  async purchase(passenger: { name: string; email: string }) {
    await this.page.locator('#flight-passenger-name').fill(passenger.name);
    await this.page.locator('#flight-passenger-email').fill(passenger.email);
    await this.page.locator('#flight-purchase-btn').click();
  }
}
