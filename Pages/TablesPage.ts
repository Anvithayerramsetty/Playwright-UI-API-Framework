import { Practicepage } from './PracticePage';
import { TableComponent } from './TableComponent';
export class TablesPage extends Practicepage {
  get medals() { return new TableComponent(this.page.locator('#static-table')); }
  get dynamic() { return new TableComponent(this.page.locator('#dynamic-table')); }
  get cityPointsSummary() { return this.page.locator('#dynamic-man-city-points'); }
  async regenerate() { await this.page.locator('#btn-refresh-dynamic').click(); }
}
