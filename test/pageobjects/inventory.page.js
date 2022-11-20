import Page from './page';


class InventoryPage extends Page {
    get BurgerButton () {
        return $('#react-burger-menu-btn');
    }

    get LogoutLink () {
        return $('#logout_sidebar_link');
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
    open(){
        return super.open('inventory.html')
    }
}

export default new InventoryPage();
