
const SignupPage = require('../pageobjects/SignUp.page');
const fs = require('fs');
const { expect } = require('chai')

const filePath = 'test/utilis/Userdetails.json';
let users;

// Read the JSON file
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }
  try {
    // Parse the JSON data
    users = JSON.parse(data);
   
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});


describe('Instagram Sign-Up', () => {
  beforeEach(async () => {
   
    await SignupPage.open();
  });

  afterEach(async () => {
    await browser.closeWindow();
    await browser.reloadSession();
  });

  it('null value insertion', async () => {
    expect(await SignupPage.signupButton.isClickable()).to.be.false;
  });

  it('should show an error for invalid email', async () => {
    await SignupPage.signup('testcase', 'tejas--s', 'tejassdfdsad', 'sdfdsasdf');
    const errorText = await SignupPage.getErrorText();
    expect(errorText).to.includes('Enter a valid email address');
  });

  it('should show an error for an existing username', async () => {
    await SignupPage.signup('tejas@example.com', 'John Doe', 'existing_username', 'password123');
    const errorText = await SignupPage.getErrorText();
    expect(errorText).to.includes('This username isn\'t available');
  });

  it('should allow to create a new user', async () => {
    const validUser = users[0];
    await SignupPage.signup(validUser.email, validUser.fullName, validUser.username, validUser.password);
    expect(await $("//button[text()='Next']").isClickable()).to.be.false;
       await $("//*[@title='Month:']").selectByVisibleText("January");
       await $("//*[@title='Day:']").selectByVisibleText("1");
       await $("//*[@title='Year:']").selectByVisibleText("2000");
       await $("//button[text()='Next']").click();
   
  })
 
});
