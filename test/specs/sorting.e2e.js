import LoginPage from  '../pageobjects/login.page';
import InventoryPage from '../pageobjects/inventory.page';

beforeAll(async ()=>{
    await LoginPage.open();
    await LoginPage.login('standard_user', 'secret_sauce');
});

afterAll(async () => {
    await InventoryPage.open();
    //await InventoryPage.BurgerButton.waitForClickable();
    await InventoryPage.BurgerButton.click();
    //await InventoryPage.LogoutLink.waitForClickable();
    await InventoryPage.LogoutLink.click();
    expect(browser).toHaveUrl("https://www.saucedemo.com/");
});

describe("Inventory page", () => {
    const isArrayOrder = (array, direction='ascending') => {
        let error;
        if(direction === 'descending'){
            array.some((value, index) => {
                if (index === 0) return false;
                else return value >= array[index-1];
            });
        } else
            array.some((value, index) => {
                if (index === 0) return false;
                else return value <= array[index-1];
            });
        return !error;
    };

    const hasArrayDuplicates = (array) => {
        return array.some((element, index) => {
            if(index === 0) return false;
            else return element === array[index-1];
        });
    };

    it("Has different products without repetition of images nor names", async ()=> {
        await InventoryPage.Products.waitForExist();
        let data = await InventoryPage.getAllItemsData();
        expect(hasArrayDuplicates(data.names)).toBeFalse();
        expect(hasArrayDuplicates(data.imgSrcs)).toBeFalse();
    });

    it("Should allow user to sort items alphabetically (ascending)", async ()=> {
        await InventoryPage.Products.waitForExist();
        await InventoryPage.sortDropdown.waitForClickable();
        await InventoryPage.SortAscending();
        let data = await InventoryPage.getAllItemsData();
        expect(isArrayOrder(data.names, 'ascending')).toBeTrue();
    });

    it("Should allow user to sort items alphabetically (descending)", async ()=> {
        await InventoryPage.Products.waitForExist();
        await InventoryPage.sortDropdown.waitForClickable();
        await InventoryPage.SortDescending();
        let data = await InventoryPage.getAllItemsData();
        expect(isArrayOrder(data.names, 'descending')).toBeTrue();
    });

    it("Should allow user to sort items by price (ascending)", async ()=> {
        await InventoryPage.Products.waitForExist();
        await InventoryPage.sortDropdown.waitForClickable();
        await InventoryPage.SortPriceAscending();
        let data = await InventoryPage.getAllItemsData();
        expect(isArrayOrder(data.prices, 'ascending')).toBeTrue();
    });

    it("Should allow user to sort items by price (descending)", async ()=> {
        await InventoryPage.Products.waitForExist();
        await InventoryPage.sortDropdown.waitForClickable();
        await InventoryPage.SortPriceDescending();
        let data = await InventoryPage.getAllItemsData();
        expect(isArrayOrder(data.prices, 'descending')).toBeTrue();
    });
});