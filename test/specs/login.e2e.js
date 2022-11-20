import LoginPage from  '../pageobjects/login.page';
import InventoryPage from '../pageobjects/inventory.page';

beforeAll(async () => {
    await LoginPage.open();
});

describe('Login page', () => {

    it('should not login with some empty login field', async () => {
        await LoginPage.login('standard_user', '');
        expect(await LoginPage.getLoginMessage())
            .toMatch(/password/i);
        await LoginPage.login('', 'secret_sauce');
        expect(await LoginPage.getLoginMessage())
            .toMatch(/username/i);
    });

    it('should not login with invalid credentials',async () => {
        await LoginPage.login('unknown ', 'password');
        expect(await LoginPage.getLoginMessage())
            .toMatch(/Username and password/i);
    });

    it('should not login if user is blocked', async () => {
        await LoginPage.login('locked_out_user', 'secret_sauce');
        expect(await LoginPage.getLoginMessage())
            .toMatch(/locked/i);
    });

    it('should login with valid credentials', async () => {
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(InventoryPage.LogoutLink).toBeExisting();
        await expect(InventoryPage.LogoutLink).toHaveElementProperty('innerText','Logout');
    });
});


