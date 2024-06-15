import assert from 'node:assert';

import { Given, When, Then, AfterAll } from '@cucumber/cucumber';
import { Browser, Builder, By, Capabilities } from 'selenium-webdriver';

import 'chromedriver';

const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { w3c: false });
const driver = new Builder().forBrowser(Browser.CHROME).withCapabilities(capabilities).build();

// todo -> find how to make  screenshots work
// import {  After, Status } from '@cucumber/cucumber';
// After(function (scenario) {
//   if (scenario.result?.status === Status.FAILED) {
//     return driver.takeScreenshot().then(function (base64png) {
//       this.attach(base64png, 'image/png');
//     });
//   }
// });

function delay(seconds: number) {
  return new Promise((res) => {
    setTimeout(() => {
      res(null);
    }, seconds * 1000);
  });
}

Given('user navigates to {string}', async function (url) {
  await driver.get(url);
  await delay(3);
});

When('clicking next page', async function () {
  const element = await driver.findElement(By.css('button[aria-label="Go to next page"]'));

  await element.click();
  await delay(3);

  // todo -> instead of a fixed 3 second wait, should wait for the loading text to disappear
  // const loadingElement = await driver.findElement(By.xpath(`//*[contains(text(),'Loading')]`));
});

Then('the page should contain {string}', { timeout: 60 * 1000 }, async function (textToFind) {
  const el = await driver.findElement(By.xpath(`//*[contains(text(),'${textToFind}')]`));
  assert.equal(!!el, true);
});

AfterAll(async function () {
  await driver.quit();
});
