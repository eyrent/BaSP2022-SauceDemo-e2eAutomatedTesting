import LoginPage from  '../pageobjects/login.page';
import InventoryPage from '../pageobjects/inventory.page';
import CartPage from '../pageobjects/cart.page';
import CheckoutPage from '../pageobjects/checkout.page';

const clientData = {
    firstName: "Fabricio",
    lastName: "Castillo",
    zipCode: "2000"
}

const loginData = {
    user: "problem_user",
    pass: "secret_sauce"
}

describe('One item purchase', () => {
    const itemNum = 2;
    let itemName;
    it('should login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login(loginData.user, loginData.pass);
    });

    it('should add an item to the cart', async () => {
        await InventoryPage.addItemToCartByOrder(itemNum);
        itemName = await InventoryPage.getItemNameByOrder(itemNum);
        expect(await InventoryPage.ShoppingCartCounter.getProperty('innerText')).toEqual("1");
    });

    it('should confirm purchased items', async () => {
        await InventoryPage.ShoppingCartLink.click();
        expect((await CartPage.items).length).toEqual(1);
        expect(await CartPage.getItemNameByOrder(1)).toEqual(itemName);
        await CartPage.checkoutBtn.click();
    });

    it('should show error message with \'name\' is left empty', async () => {
        await CheckoutPage.formLastName.setValue(clientData.lastName);
        await CheckoutPage.formZipCode.setValue(clientData.firstName);
        await CheckoutPage.continueButton.click();
        expect(await CheckoutPage.getErrorMessage()).toMatch(/first name/i);

    });

    it('should show error message with \'last name\' is left empty', async () => {
        await CheckoutPage.formName.setValue([' ', 'Backspace'], { translateToUnicode: true });
        await CheckoutPage.formName.setValue(clientData.firstName);
        await CheckoutPage.formLastName.setValue([' ', 'Backspace'], { translateToUnicode: true });
        await CheckoutPage.formZipCode.setValue(clientData.lastName);
        await CheckoutPage.formZipCode.setValue([' ', 'Backspace'], { translateToUnicode: true });
        await CheckoutPage.continueButton.click();
        expect(await CheckoutPage.getErrorMessage()).toMatch(/last name/i);
    });

    it('should show error message with \'zip code\' is left empty', async () => {
        await CheckoutPage.formName.setValue([' ', 'Backspace'], { translateToUnicode: true });
        await CheckoutPage.formName.setValue(clientData.firstName);
        await CheckoutPage.formLastName.setValue([' ', 'Backspace'], { translateToUnicode: true });
        await CheckoutPage.formLastName.setValue(clientData.lastName);
        await CheckoutPage.formZipCode.setValue([' ', 'Backspace'], { translateToUnicode: true });
        await CheckoutPage.continueButton.click();
        expect(await CheckoutPage.getErrorMessage()).toMatch(/code/i);
    });

    it('should take all client shipping information fields', async () => {
        await CheckoutPage.formName.setValue([' ', 'Backspace'], { translateToUnicode: true });
        await CheckoutPage.formName.setValue(clientData.firstName);
        await CheckoutPage.formLastName.setValue([' ', 'Backspace'], { translateToUnicode: true });
        await CheckoutPage.formLastName.setValue(clientData.lastName);
        await CheckoutPage.formZipCode.setValue([' ', 'Backspace'], { translateToUnicode: true });
        await CheckoutPage.formZipCode.setValue(clientData.zipCode);
        await CheckoutPage.continueButton.click();
    });
    
    it('confirm purchase', async () => {
        await CheckoutPage.finishButton.click();
        expect(await CheckoutPage.secondaryHeader.getProperty('innerText')).toMatch(/complete/i);
        await expect(CheckoutPage.ShoppingCartCounter).not.toExist();
        await CheckoutPage.goBackButton.click();
    });

    it('logout', async () => {
        await InventoryPage.BurgerButton.click();
        await InventoryPage.LogoutLink.waitForClickable({timeout: 10000});
        await InventoryPage.LogoutLink.click();
    });
});

