import { Page, Locator, expect } from "@playwright/test";

export class ProductPage {

    readonly page: Page;
    readonly productClick: Locator;
    readonly dropdownOption: Locator;
    readonly searchProduct: Locator;
    readonly addToCart: Locator;
    readonly cartButton: Locator;
    readonly proceedToCheckoutButton: Locator;
    readonly paymentCard: Locator;
    readonly cvvNumber: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productClick =
            page.getByRole("button", { name: "Products" });

        this.dropdownOption =
            page.getByText("Commerce").first();

        this.searchProduct =
            page.getByPlaceholder("Search products…").first();
        this.cartButton =
            page.locator("#cart-open-btn");

        this.addToCart =
            page.getByTestId("add-to-cart-btn").first();



        this.proceedToCheckoutButton =
            page.getByRole("button", { name: "Proceed to Checkout" });

        this.paymentCard =
            this.paymentCard =
            page.locator('#radio_card_visa_4242');

        this.cvvNumber =
            page.locator("#checkout-cvv");

        this.placeOrderButton =
            page.getByRole("button", { name: "Place Order" });
    }

    async goToProductPage() {
        await this.page.goto("https://www.playwrightautomation.com/");
    }

    async openProducts() {
        await this.productClick.click();
        await this.dropdownOption.click();
    }

    async searchForProduct(productName: string) {
        await this.searchProduct.fill(productName);
    }

    async verifyProductName(productName: string) {
        await expect(
            this.page.getByText(productName, { exact: true }).first()
        ).toBeVisible();
    }

    async addProductToCart() {
        await this.addToCart.click();
    }

    async openCart() {
        await this.cartButton.click();
    }

    async verifyCartItem(productName: string) {
        await expect(
            this.page
                .getByTestId("cart-modal-item-name")
                .filter({ hasText: productName })
        ).toBeVisible();
    }

    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
        await expect(this.page).toHaveURL("https://www.playwrightautomation.com/checkout.html");
    }

    async enterPaymentDetails(cvv: string) {
        await this.paymentCard.check();
        await this.cvvNumber.fill(cvv);
    }

    async placeOrder() {
        await this.placeOrderButton.click();

        await expect(
            this.page.getByText("Order Placed!")
        ).toBeVisible();
    }
}