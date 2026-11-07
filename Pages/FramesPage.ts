import { Practicepage } from './PracticePage';
import type { PaymentData } from '../test_data/paymentData';
export class FramesPage extends Practicepage {
  get dashboardFrames() { return this.page.getByTestId('travel-dashboard').locator('iframe'); }
  get payment() { return this.page.frameLocator('#frame-payment-82'); }
  get status() { return this.page.locator('#payment-status-display'); }
  get balance() { return this.page.locator('#payment-balance-display'); }
  async pay(data: PaymentData) {
    await this.payment.getByLabel('Card Holder', { exact: true }).fill(data.holder);
    await this.payment.getByLabel('Card Number', { exact: true }).fill(data.card);
    await this.payment.getByLabel('Expiry Date', { exact: true }).fill(data.expiry);
    await this.payment.getByLabel('CVV', { exact: true }).fill(data.cvv);
    await this.payment.getByRole('button', { name: 'Pay Now', exact: true }).click();
  }
  get feedback() { return this.page.frameLocator('#frame-feedback'); }
  get business() { return this.feedback.frameLocator('#frame-travel-prefs').getByRole('radio', { name: 'Business', exact: true }); }
  async selectBusiness() {
    await this.feedback.getByPlaceholder('Your name', { exact: true }).fill('Test User');
    await this.feedback.getByPlaceholder('email@example.com', { exact: true }).fill('test@example.com');
    await this.business.check();
  }
  async loadComplaint() { await this.page.getByRole('button', { name: 'Load Complaint Form', exact: true }).click(); }
  // A smoke assertion only; original test did not specify complaint submission requirements.
  get complaintName() { return this.page.frameLocator('#frame-support').locator('#complaint-phone'); }
}
