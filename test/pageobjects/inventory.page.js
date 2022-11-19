import Page from './page';

class InventoryPage extends Page {
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
        return $('.primary_header .shopping_cart_container div[class*="badge"]');
    }
    getProductByOrder = (index) => {
        return $(`.inventory_list .inventory_item:nth-child(${index})`);
    }
    getBuyButtonByOrder = (index) => {
        return $(`.inventory_list .inventory_item:nth-child(${index})`);
    }
    open(){
        return super.open('inventory.html')
    }
}

export default new InventoryPage();
