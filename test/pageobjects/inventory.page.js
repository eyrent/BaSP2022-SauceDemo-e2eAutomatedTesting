import Page from './page';


class InventoryPage extends Page {
    get BurgerButton () {
        return $('#react-burger-menu-btn');
    }

    get LogoutLink () {
        return $('#logout_sidebar_link');
    }

    get Products() {
        return $('.inventory_list');
    }

    get ProductList() {
        return $$('.inventory_container .inventory_list .inventory_item');
    }

    get ShoppingCartLink(){
        return $('.primary_header .shopping_cart_container a');
    }

    get ShoppingCartCounter(){
        return $('.primary_header .shopping_cart_container span[class*="badge"]');
    }

    get sortDropdown(){
        return $('.product_sort_container');
    }

    SortAscending(){
        return this.sortDropdown.selectByAttribute('value', 'az');
    }

    SortDescending(){
        return this.sortDropdown.selectByAttribute('value', 'za');
    }

    SortPriceAscending(){
        return this.sortDropdown.selectByAttribute('value', 'lohi');
    }

    SortPriceDescending(){
        return this.sortDropdown.selectByAttribute('value', 'hilo');
    }

    // getProductByOrder(index){
    //     return $(`.inventory_list .inventory_item:nth-child(${index})`);
    // }

    // getBuyButtonByOrder(index){
    //     return $(`.inventory_list .inventory_item:nth-child(${index})`);
    // }
    async addItemToCartByOrder(index){
        await $('.inventory_list ' +
        `.inventory_item:nth-child(${index}) ` +
        'button[id*="add-to-cart"]')
            .click();
        // maybe assert something here?
    }
    async removeItemFromCartByOrder(index){
        await $('.inventory_list ' +
        `.inventory_item:nth-child(${index}) ` +
        'button[id*="remove"]')
            .click();
        // maybe assert something here?
    }
    getItemNameByOrder(index){
        return $('.inventory_list ' +
        `.inventory_item:nth-child(${index}) ` +
        '.inventory_item_name').getProperty('innerText');
    }
    getItemPriceByOrder(index){
        return $('.inventory_list ' +
        `.inventory_item:nth-child(${index}) ` +
        '.inventory_item_price').getProperty('innerText');
    }
    getItemImgSrcByOrder(index){
        return $('.inventory_list ' +
        `.inventory_item:nth-child(${index}) ` +
        '.inventory_item_img img').getProperty('src');
    }
    async getAllItemsData(){
        const itemNames = [];
        const itemPrices = [];
        const itemImgSrcs = [];
        const itemDescriptions = [];
        const itemSelectors = await this.ProductList;
        for(let i = 0; i < itemSelectors.length; i++){
            itemNames.push(await itemSelectors[i].$('.inventory_item_name').getProperty('innerText'));
            itemPrices.push(await itemSelectors[i].$('.inventory_item_price').getProperty('innerText'));
            itemImgSrcs.push(await itemSelectors[i].$('.inventory_item_img img').getProperty('src'));
            itemDescriptions.push(await itemSelectors[i].$('.inventory_item_desc').getProperty('innerText'));
        }
        return {
            names: itemNames,
            prices: itemPrices,
            imgSrcs: itemImgSrcs,
            descriptions: itemDescriptions
        }
    }
    open(){
        return super.open('inventory.html')
    }
}

export default new InventoryPage();
