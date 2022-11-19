import LoginPage from  '../pageobjects/login.page';
import InventoryPage from '../pageobjects/inventory.page';

describe('Login page', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(InventoryPage.LogoutLink).toBeExisting();
        await expect(InventoryPage.LogoutLink).toHaveElementProperty('innerText','Logout');
    });
});


