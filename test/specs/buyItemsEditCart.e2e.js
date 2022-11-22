import LoginPage from  '../pageobjects/login.page';
import InventoryPage from '../pageobjects/inventory.page';
import CartPage from '../pageobjects/cart.page';
import CheckoutPage from '../pageobjects/checkout.page';

describe('Multiple items purchase', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
    });

    it('should add all items to the cart', async () => {
        const numItems = (await InventoryPage.ProductList).length;
        for(let i = 0; i < numItems; i++){
            await InventoryPage.addItemToCartByOrder(i+1);
        }
        expect(parseInt(await InventoryPage.ShoppingCartCounter.getProperty('innerText'), 10))
            .toEqual(numItems);
    });

    it('should remove some items from the cart', async () => {
        let numItems = (await InventoryPage.ProductList).length;
        for(let i = 0; i < numItems; i += 2){
            await InventoryPage.removeItemFromCartByOrder(i+1);
            numItems -= 1;
        }
        expect(parseInt(await InventoryPage.ShoppingCartCounter.getProperty('innerText'), 10))
            .toEqual(numItems);
    });

    it('should edit and confirm purchased items', async () => {
        await InventoryPage.ShoppingCartLink.click();
        const numItems = (await CartPage.items).length;
        await CartPage.removeItemByOrder(3);
        expect(parseInt(await CartPage.ShoppingCartCounter.getProperty('innerText'), 10))
            .toEqual(numItems -1);
        await CartPage.checkoutBtn.click();
    });

    it('should take client shipping information', async () => {
        await CheckoutPage.formName.setValue('Fabricio');
        await CheckoutPage.formLastName.setValue('Castillo');
        await CheckoutPage.formZipCode.setValue('2000');
        await CheckoutPage.continueButton.click();
    });
    it('confirm purchase', async () => {
        await CheckoutPage.finishButton.click();
        await CheckoutPage.goBackButton.click();
    });
    it('logout', async () => {
        await InventoryPage.BurgerButton.click();
        await InventoryPage.LogoutLink.waitForClickable({timeout: 10000});
        await InventoryPage.LogoutLink.click();
    });
});

