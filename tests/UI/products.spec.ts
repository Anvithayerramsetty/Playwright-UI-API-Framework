import { test } from "../..//fixtures/Fixtures"
import { ProductPage } from "../..//Pages/Products"
import { LoginPage } from "../..//Pages/LoginPage";

test("Products flow", async ({ page, Productpage, loginpage }) => {
    //   test.setTimeout(60000)

    
    const productName = "Wireless Headphones Pro";
    const cvv = "100";

    await Productpage.goToProductPage()
    await Productpage.openProducts()
    await Productpage.searchForProduct(productName)
    await Productpage.verifyProductName(productName)
    await Productpage.addProductToCart()
    await Productpage.openCart()
    await Productpage.verifyCartItem(productName)
    await Productpage.proceedToCheckout()
    await Productpage.enterPaymentDetails(cvv)
    await Productpage.placeOrder()
console.log(
        await page.evaluate(() => ({
            localStorage: { ...localStorage },
            sessionStorage: { ...sessionStorage }
        }))
    );
});
