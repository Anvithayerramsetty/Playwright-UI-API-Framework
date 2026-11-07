import { Practicepage } from './PracticePage';
export class DialogsPage extends Practicepage {
  async respond(button: 'Simple Alert' | 'Confirmation Alert' | 'Prompt Alert', response: 'accept' | 'dismiss', text?: string) {
    // Resolve the dialog before awaiting click: an open modal can block click completion.
    const handled = this.page.waitForEvent('dialog').then(async dialog => {
      const observed = { type: dialog.type(), message: dialog.message() };
      if (response === 'accept') await dialog.accept(text); else await dialog.dismiss();
      return observed;
    });
    const [observed] = await Promise.all([handled,
      this.page.getByRole('button', { name: button, exact: true }).click()]);
    return observed;
  }
}
