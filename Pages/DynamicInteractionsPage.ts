import { Practicepage } from './PracticePage';
export class DynamicInteractionsPage extends Practicepage {
  async selectEmployee(id: string) {
    const employee = this.page.getByTestId('employee-item').filter({ hasText: id });
    await employee.scrollIntoViewIfNeeded();
    await employee.click();
    return employee;
  }
  async startDelayedButton() { await this.page.locator('#btn-start').click(); }
  get stateButton() { return this.page.locator('#dynamic-state-btn'); }
}
