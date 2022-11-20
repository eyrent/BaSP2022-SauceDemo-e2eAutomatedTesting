import Page from './page';

class LoginPage extends Page {
    get inputUsername () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('#login-button');
    }

    get errorMessageContainer () {
        return $('.error-message-container');
    }

    async login (username, password) {
        await this.inputUsername.setValue([' ', 'Backspace'], { translateToUnicode: true });
        //await this.inputUsername.clearValue();
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue([' ', 'Backspace'], { translateToUnicode: true });
        //await this.inputUsername.clearValue();
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }
    async getLoginMessage() {
        const errorElement = await this.errorMessageContainer;
        return errorElement.getProperty('innerText');
    }

    open () {
        return super.open('');
    }
}

export default new LoginPage();
