import Page from './page';

class CartPage extends Page {
    get checkoutBtn(){
        return $('.btn[id*="checkout"]');
    }

    get inventoryBtn(){
        return $('.btn[id*="continue-shopping"]');
    }

    get items(){
        return $$('.cart_list .cart_item');
    }
    
    get ShoppingCartCounter(){
        return $('.primary_header .shopping_cart_container span[class*="badge"]');
    }

    getItemNameByOrder(index){
        return this.items[index -1];
    }

    getItemNameByOrder(index){
        return this.items[index -1].$('.inventory_item_name')
            .getProperty('innerText');
    }

    async removeItemByOrder(index){
        await this.items[index -1].$('button[id*="remove"]').click();
    }

    open(){
        return super.open('cart.html')
    }
}

export default new CartPage();