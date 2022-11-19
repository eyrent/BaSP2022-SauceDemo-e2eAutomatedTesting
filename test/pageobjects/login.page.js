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

    async login (username, password) {
        await this.inputUsername.clearValue();
        await this.inputUsername.setValue(username);
        await this.inputPassword.clearValue();
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    open () {
        return super.open('');
    }
}

export default new LoginPage();
