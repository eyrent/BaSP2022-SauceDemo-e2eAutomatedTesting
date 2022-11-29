import Page from './page';

class CheckoutPage extends Page {
    get formName(){
        return $('form input[id="first-name"]');
    }

    get formLastName(){
        return $('form input[id="last-name"]');
    }

    get formZipCode(){
        return $('form input[id="postal-code"]');
    }

    get continueButton(){
        return $('form input[type="submit"]');
    }

    get finishButton(){
        return $('button[id*="finish"]')
    }

    get cancelButton(){
        return $('button[id="cancel"]');
    }

    get goBackButton(){
        return $('button[id*="back"]');
    }
    get errorMessageContainer(){
        return $('.checkout_info .error-message-container');
    }
    get secondaryHeader(){
        return $('.header_secondary_container');
    }
    get ShoppingCartCounter(){
        return $('.primary_header .shopping_cart_container span[class*="badge"]');
    }
    get Summary(){
        return $('#checkout_summary_container');
    }
    get TaxCostValue(){
        return $('#checkout_summary_container .summary_tax_label');
    }
    get TotalCostValue(){
        return $('#checkout_summary_container .summary_total_label');
    }
    getErrorMessage(){
        return this.errorMessageContainer.getProperty('innerText');
    }
    open(){
        return super.open('checkout-step-one.html');
    }
}

export default new CheckoutPage();