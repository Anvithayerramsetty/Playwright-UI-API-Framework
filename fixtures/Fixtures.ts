import {test as base} from "@playwright/test"
import { LoginPage } from "../Pages/LoginPage"
import { ProductPage } from "../Pages/Products"

type Myfixtures= {
    loginpage:LoginPage;
    Productpage:ProductPage;
}

export const test = base.extend<Myfixtures>({
    loginpage:async({page},use)=>{
        const login = new LoginPage(page);
        await use(login)
    },
     Productpage:async({page},use)=>{
        const product = new ProductPage(page);
        await use(product)
     },

});


/*import {test as base} from "@playwright/test"
import { LoginPage } from "../Pages/LoginPage"
type Myfixtures={
    loginpage:LoginPage;
}
export const test = base.extend<Myfixtures>({
    loginpage:async({page},use)=>{
        const login= new LoginPage(page)
        await use(login)

    }
})*/