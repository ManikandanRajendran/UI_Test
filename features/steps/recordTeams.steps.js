const{Given, When,Then} = require('@cucumber/cucumber')
const webdriver = require('selenium-webdriver');
var commonFunctions = require('../../commons/commonFunctions');
const { fixturesPageElements } = require('../../webElements/scoresFixturesPage');
const {loginErrorMessages} = require('../../webElements/constants');
const assert = require('assert');
const { Console } = require('console');
const { By, until } = webdriver;



Given('setup the environment details', async function(){
    this.GLOBAL = {};
    this.GLOBAL.baseUrl = `https://www.bbc.co.uk/sport/football/scores-fixtures`;
});

Given('the user is on Football Scores & Fixtures page',async function () {
    await commonFunctions.navigatePage.call(this, this.GLOBAL.baseUrl);
});

When('the user seeing todays Scores & Fixtures',async function () {
    let result = await commonFunctions.getTextOfElement.call(this, fixturesPageElements.today);
    assert.strictEqual(result,"TODAY")
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

Given(`the user clicks sign in button`,async function(){
    await commonFunctions.waitForElement.call(this,fixturesPageElements.goToSignIn);
    await commonFunctions.clickElement.call(this, fixturesPageElements.goToSignIn);
    await commonFunctions.waitForPageLoad.call(this);
    let currentUrl = await commonFunctions.getCurrentUrl.call(this);
    assert.strictEqual(currentUrl.includes('&action=sign-in'), true);
});

When('user enters email as {string}', async function(email){
    await commonFunctions.waitForElement.call(this, fixturesPageElements.emailField);
    await commonFunctions.clickElement.call(this, fixturesPageElements.emailField);
    await commonFunctions.enterValue.call(this, fixturesPageElements.emailField, email);
    await commonFunctions.clickElement.call(this, fixturesPageElements.passwordField);
});

When('user enters password as {string}', async function(password){
    await commonFunctions.waitForElement.call(this, fixturesPageElements.passwordField);
    await commonFunctions.clickElement.call(this, fixturesPageElements.passwordField);
    await commonFunctions.enterValue.call(this, fixturesPageElements.passwordField, password);
    await commonFunctions.clickElement.call(this, fixturesPageElements.emailField);
});

When(`click Sign in`, async function(){
    await commonFunctions.waitForElement.call(this, fixturesPageElements.submitButton);
    await commonFunctions.clickElement.call(this, fixturesPageElements.submitButton);
});

Then('user should be displayed with proper error for the scenario {string}', async function (scenario) {
    switch(scenario)
    {
        case "NoAccount":
            element = fixturesPageElements.emailErrorElement;
            error = loginErrorMessages.errorNoAccountFound;
        break;

        case "invalidPassword": 
            element = fixturesPageElements.passwordErrorElement;
            error = loginErrorMessages.invalidPassword;
        break;
    }

    await commonFunctions.waitForElement.call(this, element);
    let errorMessage = await commonFunctions.getTextOfElement.call(this, element);
    assert.strictEqual(errorMessage, error);
});

Then('user should see the error message as {string} for invalid email', async function(scenario){
    switch(scenario)
    {
        case "Empty": error = loginErrorMessages.emailEmptyErrorMessage;
        break;

        case "tooShort": error = loginErrorMessages.singleCharUsername;
        break;

        case "invalidUsername": error = loginErrorMessages.errorWhenEnterEmailNoAt;
        break;

        case "SpecialSymbols": error = loginErrorMessages.errorWhenEnterEmailNoAt;
        break;

        case "invalidEmail": error = loginErrorMessages.invalidEmailErrorMessage;
        break;
    }
    await commonFunctions.waitForElement.call(this, fixturesPageElements.emailErrorElement);
    let errorMessage = await commonFunctions.getTextOfElement.call(this, fixturesPageElements.emailErrorElement);
    assert.strictEqual(errorMessage, error);
});

Then('user should see the error message as {string} for invalid password', async function(scenario){
    switch(scenario)
    {
        case "Empty": error = loginErrorMessages.emailEmptyErrorMessage;
        break;

        case "tooShort": error = loginErrorMessages.shortPasswordError;
        break;

        case "onlyLetters": error = loginErrorMessages.errorWhenEntersOnlyLetters;
        break;

        case "onlyNumbers": error = loginErrorMessages.errorWhenEntersOnlyNumbers;
        break;

        case "onlySpecial": error = loginErrorMessages.errorWhenEntersOnlyNumbers;
        break;

        case "noLetter": error = loginErrorMessages.errorWhenEntersOnlyNumbers;
        break;
    }
    await commonFunctions.waitForElement.call(this, fixturesPageElements.passwordErrorElement);
    let errorMessage = await commonFunctions.getTextOfElement.call(this, fixturesPageElements.passwordErrorElement);
    assert.strictEqual(errorMessage, error);
})

Then('the user should be able to see all the team names with a match today',async function () {
    let matches = await commonFunctions.findElements.call(this, fixturesPageElements.numberOfMatches);
    if(matches.length>0){
        console.log("****************************");
        console.log("Total Matches count : "+matches.length);
        console.log("****************************");
        for(let i=1;i<=matches.length;i++)
        {
            let locator = (fixturesPageElements.matchTitle.locator).replace('X',i);
            let newElements = {locator:locator, locatorType:fixturesPageElements.matchTitle.locatorType};
            let matchTitles = await commonFunctions.getTextOfElement.call(this, newElements);
            console.log(`Title of the Match : ${matchTitles}`);
            console.log(`-----------------------------------`);
            let teamsLocatorUl = (fixturesPageElements.teamNamesUlCount.locator).replace('X',i);
            let newTeamNamesLocator = {locator:teamsLocatorUl,locatorType:`css`};
            let checkElementLength = await commonFunctions.getElementsCount.call(this, `div:nth-of-type(3) .qa-match-block:nth-of-type(${i})>ul`);       
            if(checkElementLength>0){
                let teamsLengthUl = await commonFunctions.findElements.call(this, newTeamNamesLocator);
                await getTeamName.call(this,teamsLocatorUl,teamsLengthUl);
            }
            let teamsLocatorDiv = (fixturesPageElements.teamNamesUlDiv.locator).replace('X',i);
            let newTeamNamesLocator1 = {locator:teamsLocatorDiv,locatorType:`css`};
            checkElementLength = await commonFunctions.getElementsCount.call(this, `div:nth-of-type(3) .qa-match-block:nth-of-type(${i})>div`);
            if(checkElementLength>0)
            {
                let teamsLengthDiv = await commonFunctions.findElements.call(this, newTeamNamesLocator1);
                await getTeamName.call(this,teamsLocatorDiv,teamsLengthDiv);
            }
            console.log(`***************************`);
        }
    }
    else
    {
        console.log("There is no Matches for today!")
    }
    
});


async function getTeamName(teamsLocatorUl,teamsLengthUl){
    for(let j=1;j<=teamsLengthUl.length;j++){
        let newTeamNamesLocator1 = {locator:`${teamsLocatorUl}:nth-of-type(${j}) div>span:nth-of-type(1)`,locatorType:`css`};
        let newTeamNamesLocator2 = {locator:`${teamsLocatorUl}:nth-of-type(${j}) div>span:nth-of-type(3)`,locatorType:`css`};
        let checkElementLength = await commonFunctions.getElementsCount.call(this,newTeamNamesLocator1.locator);
        if(checkElementLength>0)
        {
            let team1 = await commonFunctions.getTextOfElement.call(this,newTeamNamesLocator1);
            let team2 = await commonFunctions.getTextOfElement.call(this,newTeamNamesLocator2);
            console.log(`${team1} : ${team2}`);
        }        
    }
}