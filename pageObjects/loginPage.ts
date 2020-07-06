import {Selector} from 'testcafe'

class LoginPage {
    login_form: Selector
    username: Selector
    password: Selector
    keep_me_signed_in: Selector
    signIn_btn: Selector
    forgot_password: Selector
    invalid_login_error: Selector

    constructor(){
        this.login_form = Selector('#login_form')
        this.username = Selector('#user_login')
        this.password = Selector('#user_password')
        this.keep_me_signed_in = Selector('#user_remember_me')
        this.signIn_btn = Selector('.btn-primary')
        this.forgot_password = Selector('[href*="forgot-password.html"]')
        this.invalid_login_error = Selector('.alert-error')
    }
}

export default LoginPage