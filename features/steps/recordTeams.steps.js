const{Given, When,Then} = require('@cucumber/cucumber')
const webdriver = require('selenium-webdriver');
var commonFunctions = require('../../commons/commonFunctions');
const { fixturesPageElements } = require('../../webElements/scoresFixturesPage');
const assert = require('assert');
const { By, until } = webdriver;



Given('setup the environment details', async function(){
    this.GLOBAL = {};
    this.GLOBAL.baseUrl = `https://www.bbc.co.uk/sport/football/scores-fixtures`;
});

Given('the user is on Football Scores & Fixtures page',async function () {
    await commonFunctions.navigatePage.call(this, this.GLOBAL.baseUrl);
});


When('the user enters the keyword sports and click search', async function(){
    await commonFunctions.clickElement.call(this, fixturesPageElements.searchField);
    await commonFunctions.enterValue.call(this, fixturesPageElements.searchField, "sports");
    await commonFunctions.waitForPageLoad.call(this);
    await commonFunctions.clickElement.call(this, fixturesPageElements.searchButton);
    await commonFunctions.waitForPageLoad.call(this);
    await this.driver.wait(until.urlContains('/search?q=sports'));
});

Then('the user should be displayed search result page', async function(){
    let currentUrl = await commonFunctions.getCurrentUrl.call(this);
    assert.strictEqual(currentUrl.includes('/search?q=sports'), true);
});

Then('output the first and last heading of the article',async function(){
    await commonFunctions.waitForElement.call(this, fixturesPageElements.searchResultList)
    let totalSearchArticles = await commonFunctions.findElements.call(this, fixturesPageElements.searchResultList);
    let firstLocator = {locator:`${fixturesPageElements.searchResultList.locator}:nth-of-type(1) p span`,locatorType:`css`};
    let finalLocator = {locator:`${fixturesPageElements.searchResultList.locator}:nth-of-type(${totalSearchArticles.length}) p span`,locatorType:`css`};
    let firstArticleHeading = await commonFunctions.getTextOfElement.call(this,firstLocator);
    let finalArticleHeading = await commonFunctions.getTextOfElement.call(this,finalLocator);
    console.log("***************************************************************");
    console.log(`Heading of the first article : ${firstArticleHeading}`);
    console.log(`Heading of the final article : ${finalArticleHeading}`);
    console.log("***************************************************************");
});

