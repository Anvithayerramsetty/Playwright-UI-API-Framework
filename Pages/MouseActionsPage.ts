import { Practicepage } from './PracticePage';
export class MouseActionsPage extends Practicepage {
  get source() { return this.page.getByRole('textbox', { name: 'Field 1 (source)', exact: true }); }
  get target() { return this.page.getByRole('textbox', { name: 'Field 2 (target)', exact: true }); }
  get price() { return this.page.getByTestId('slider-price'); }
  get minimum() { return this.page.locator('#slider-price-min'); }
  get maximum() { return this.page.locator('#slider-price-max'); }
  get range() { return this.page.locator('#dual-price-display'); }
  async hover() { await this.page.getByRole('button', { name: 'Point Me', exact: true }).hover(); }
  async rightClick() { await this.page.getByRole('button', { name: 'Right Click Me', exact: true }).click({ button: 'right' }); }
  async copy() { await this.page.getByRole('button', { name: 'Copy Text', exact: true }).dblclick(); }
  async matchCities() {
    for (const [city, country] of [['rome','italy'], ['washington','usa'], ['paris','france']])
      await this.page.locator(`#drag-${city}`).dragTo(this.page.locator(`#drop-${country}`));
  }
}
