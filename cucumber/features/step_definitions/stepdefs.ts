import assert from 'node:assert';
import { Given, When, Then } from '@cucumber/cucumber';

function isItFriday(today: string) {
  if (today === 'Friday') {
    return 'TGIF';
  } else {
    return 'Nope';
  }
}

Given('today is {string}', function (givenDay) {
  this.today = givenDay;
});

When("I ask whether it's Friday yet", function () {
  this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', function (expectedAnswer) {
  assert.strictEqual(this.actualAnswer, expectedAnswer);
});

// -------------- driver usage below --------------
// import { Given, When, Then, AfterAll, After, Status } from '@cucumber/cucumber';
// import { Builder, By, Capabilities, Key } from 'selenium-webdriver';

// import 'chromedriver';

// // driver setup
// const capabilities = Capabilities.chrome();
// capabilities.set('chromeOptions', { w3c: false });
// const driver = new Builder().withCapabilities(capabilities).build();

// Given('I am on the Google search page', async function () {
//   await driver.get('http://www.google.com');
// });

// When('I search for {string}', async function (searchTerm) {
//   const element = await driver.findElement(By.name('q'));
//   element.sendKeys(searchTerm, Key.RETURN);
//   element.submit();
// });

// Then('the page title should start with {string}', { timeout: 60 * 1000 }, async function (searchTerm) {
//   const title = await driver.getTitle();
//   const isTitleStartWithCheese = title.toLowerCase().lastIndexOf(`${searchTerm}`, 0) === 0;
//   assert.strictEqual(isTitleStartWithCheese, true);
// });

// After(function (scenario) {
//   if (scenario.result?.status === Status.FAILED) {
//     return driver.takeScreenshot().then(function (base64png) {
//       this.attach(base64png, 'image/png');
//     });
//   }
// });

// AfterAll(async function () {
//   await driver.quit();
// });
