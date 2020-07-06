import CommonFunc from '../stepFunctions/homepage'
import HomePage from '../pageObjects/homepage'
import LoginPage from '../pageObjects/loginPage'
import { Selector } from 'testcafe';

const commonFunc = new CommonFunc();
const homePage = new HomePage();
const loginPage = new LoginPage();

fixture `Test suite for Zero Bank`
    .page `http://zero.webappsecurity.com/index.html`
    .before(async t => {
        console.log('Test suite execution begins...');  
    })
    .beforeEach(async t => {
        console.log('Execution started for test')
        await t.setPageLoadTimeout(3000);
    })
    .afterEach(async t => {
        console.log('Execution completed for test')
    })
    .after(async t =>{
        console.log('Test suite execution completed successfully.')
    })

test('verify page navigation', async t => {
    // verify user is on homepage
    await t.expect(Selector('title').innerText).eql('Zero - Personal Banking - Loans - Credit Cards')
    // verify user is on onlinebanking page
    await commonFunc.clickOnElement(homePage.online_banking_tab)
    await t.expect(Selector('title').innerText).eql('Zero - Free Access to Online Banking')
    // verify user is on feedback page
    await commonFunc.clickOnElement(homePage.feedback_tab)
    await t.expect(Selector('title').innerText).eql('Zero - Contact Us')
    // navigatingbackto homepage
    await commonFunc.clickOnElement(homePage.home_tab)
    await t.expect(Selector('title').innerText).eql('Zero - Personal Banking - Loans - Credit Cards')
    // verify user is on signIn page
    await commonFunc.clickOnElement(homePage.signIn_btn)
    await t.expect(Selector('title').innerText).eql('Zero - Log in')   
})

test('User with invalid Login credentials', async t => {
    await commonFunc.clickOnElement(homePage.signIn_btn)
    await t.expect(loginPage.login_form.exists).ok()
    await commonFunc.enterData(loginPage.username, 'invalid user')
    await commonFunc.enterData(loginPage.password, 'invalid password')
    await commonFunc.doubleClickOnElement(loginPage.keep_me_signed_in)
    await commonFunc.clickOnElement(loginPage.signIn_btn);
    // validating error message
    await t.expect(loginPage.invalid_login_error.innerText).contains('Login and/or password are wrong.')
})

test('User with valid Login credentials and logout', async t => {
    await commonFunc.clickOnElement(homePage.signIn_btn)
    await t.expect(loginPage.login_form.exists).ok()
    await commonFunc.enterData(loginPage.username, 'username')
    await commonFunc.enterData(loginPage.password, 'password')
    await commonFunc.doubleClickOnElement(loginPage.keep_me_signed_in)
    await commonFunc.clickOnElement(loginPage.signIn_btn);
    // validating successfull login
    await t.expect(Selector('title').innerText).eql('Zero - Account Summary')
    await commonFunc.clickOnElement(homePage.user_icon)
    await commonFunc.clickOnElement(homePage.logout_btn)
    await t.expect(homePage.signIn_btn.exists).ok()
})