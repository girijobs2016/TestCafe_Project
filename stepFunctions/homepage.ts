import HomePage from '../pageObjects/homepage';
import {t} from 'testcafe';

const homePage = new HomePage();

class CommonFunc{
    async clickOnElement(element: Selector){
        await t.click(element)
    }

    async enterData(element: Selector, text: string) {
        await t.typeText(element, text)
    }

    async doubleClickOnElement(element: Selector) {
        await t.doubleClick(element)
    }
}

export default CommonFunc