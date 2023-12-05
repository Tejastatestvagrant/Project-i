// signup.page.js
class SignupPage {
    get emailInput() { return $('[name="emailOrPhone"]'); }
    get fullNameInput() { return $('[name="fullName"]'); }
    get usernameInput() { return $('[name="username"]'); }
    get passwordInput() { return $('[name="password"]'); }
    get signupButton() { return $('button[type="submit"]'); }
    get errorMessage() { return $('#ssfErrorAlert'); }
    get successMessage() { return $('.success-message'); }
  
    async open() {
      await browser.url('https://www.instagram.com/accounts/emailsignup/?hl=en');
    }
  
    async signup(email, fullName, username, password) {
      await this.emailInput.setValue(email);
      await this.fullNameInput.setValue(fullName);
      await this.usernameInput.setValue(username);
      await this.passwordInput.setValue(password);
      await this.signupButton.click();
    }
  
    async getErrorText() {
      return await this.errorMessage.getText();
    }
  
    async getSuccessMessage() {
      return await this.successMessage.getText();
    }
  }
  
  module.exports = new SignupPage();
  