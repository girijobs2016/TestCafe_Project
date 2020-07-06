import {Selector} from 'testcafe';
import xPathToCss from 'xpath-to-css';

fixture `Getting started with TestCafe`
    .page `https://devexpress.github.io/testcafe/example`
    .before(async t => {
        console.log('Executes before first test');
        
    })
    .beforeEach(async t => {
        // controls the speed of execution
        await t.setTestSpeed(0.2);
        await t.setPageLoadTimeout(3000);
    })
    .afterEach(async t => {
        console.log('Executes after each test');
    })
    .after(async t =>{
        console.log('Executes after last test');
    })


test('My first TestCafe test', async t => { 
    const name_input = Selector('#developer-name')
    const submit_button = Selector('#submit-button')
    const article_header = Selector('#article-header').innerText

    await t.typeText(name_input, 'Girish')
    // takes screenshot of provided element
    // await t.takeElementScreenshot(submit_button);
    await t.click(submit_button)
    // takes screenshot of entire webpage.
    // await t.takeScreenshot({fullPage: true});
    await t.expect(article_header).contains('Girish');
});

test('Test Cafe Selector example', async t => {
    // we can create selector in 2 ways:
    const tried_checkbox = Selector('#tried-section')
    // or
    const tried_checkbox2 = Selector(()=>{
        return document.getElementById('tried-section')
    })
    /* We can continue the selector chain to filter elements from the previous selector 
    or traverse through the DOM tree */
    const tried_testcafe = tried_checkbox.child('label').withText('I have tried TestCafe');
    await t.click(tried_testcafe);
});

test('Interact with page', async t => {
    // click
    const tried_checkbox = Selector('#tried-section')
    const tried_testcafe = tried_checkbox.child('label').withText('I have tried TestCafe');
    await t.click(tried_testcafe)
    await t.rightClick(tried_testcafe)
    await t.doubleClick(tried_testcafe)
    
    // presskey
    const prefered_interface = Selector('#preferred-interface')
    await t.click(prefered_interface).pressKey('down')
    
    // Navigate
    await t.navigateTo('https://devexpress.github.io/testcafe/example')

    // typeText and selectText
    const name_input = Selector('#developer-name')
    await t.typeText(name_input, 'Girish').selectText(name_input)
    
    // Hover
    const submit_button = Selector('#submit-button')
    await t.hover(submit_button)

    // Drag
    const tried_checkbox2 = Selector('#tried-section')
    const tried_testcafe2 = tried_checkbox2.child('label').withText('I have tried TestCafe');
    await t.click(tried_testcafe2).drag('#slider', 360, 0, { offsetX: 10, offsetY: 10 })

    // resize window size
    await t.resizeWindowToFitDevice('iphonexr').maximizeWindow()

});

test('Assertion API example', async t => {
    const primary_os = Selector('[class*="column col-2"] fieldset p');
    // DeepEqual
    await t.expect(primary_os.count).eql(3)
    // Not Deep Equal
    await t.expect(primary_os.count).notEql(2)
    // ok
    const submit_button = Selector('#submit-button')
    await t.expect(submit_button.exists).ok()
    //Not ok
    await t.expect(Selector('#element').exists).notOk();
    // contains
    const windows = Selector('[class*="column col-2"] fieldset p:nth-child(2)')
    const text = windows.innerText;
    await t.expect(text).contains('Windows')
    // not contains
    await t.expect(text).notContains('Linux')
    // type of
    await t.expect(text).typeOf('string');
    // not type of
    await t.expect(text).notTypeOf('number');
    // greater than
    await t.expect(primary_os.count).gt(2)
    // greater than or equal to
    await t.expect(primary_os.count).gte(3)
    // less than
    await t.expect(primary_os.count).lt(4)
    // less than or equal to
    await t.expect(primary_os.count).lte(3)
    // within
    await t.expect(primary_os.count).within(1,10)
    // Not within
    await t.expect(primary_os.count).notWithin(90,100)
});

test.only('xpath to css converstion', async t => {
    const xpath = `'//*[@class="column col-2"]/fieldset/p[1]'`
    const css = xPathToCss(xpath)
    console.log(css)
    await t.click(css)
});