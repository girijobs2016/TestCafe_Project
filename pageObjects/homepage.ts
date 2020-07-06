import {Selector, t} from 'testcafe';

class HomePage {
    home_tab: Selector
    online_banking_tab: Selector
    feedback_tab: Selector
    search_btn: Selector
    signIn_btn: Selector
    custom_right: Selector
    custome_left: Selector
    more_service_btn: Selector
    user_icon: Selector
    logout_btn: Selector
    
    constructor() {
        this.home_tab = Selector('[href*="/index.html"]')
        this.online_banking_tab = Selector('#nav ul li[id=onlineBankingMenu]')
        this.feedback_tab= Selector('#nav ul li[id=feedback]')
        this.search_btn= Selector('#searchTerm')
        this.signIn_btn= Selector('[class*="signin btn"]')
        this.custom_right = Selector('[class*="custom right"]')
        this.custome_left= Selector('[class*="custom left"]')
        this.more_service_btn = Selector('#online-banking')
        this.user_icon = Selector('.icon-user')
        this.logout_btn = Selector('#logout_link')
    }

}

export default HomePage