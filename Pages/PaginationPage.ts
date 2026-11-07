import { Practicepage } from './PracticePage';
export class PaginationPage extends Practicepage {
  get root() { return this.page.locator('#section-table-paginated'); }
  get rows() { return this.root.locator('tbody tr'); }
  get next() { return this.root.locator('#pagination-next'); }
  get previous() { return this.root.locator('#pagination-prev'); }
  async reset(size: 10 | 25) {
    await this.root.locator('#pagination-search').fill('');
    await this.root.locator('#pagination-page-size').selectOption(String(size));
    const first = this.root.locator('#pagination-first');
    if (await first.isEnabled()) await first.click();
  }
}
