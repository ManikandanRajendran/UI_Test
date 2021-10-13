const assert = require('assert');
const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;


async function navigatePage(url){
    await this.driver.get(url);
}

//Function to get the By Type for for the locatorType
async function getByType(locatorType) {
    const locatorTypeLowerCase = locatorType.toLowerCase();
    if (locatorTypeLowerCase === 'css') {
      return By.css;
    } else if (locatorTypeLowerCase === 'id') {
      return By.id;
    } else if (locatorTypeLowerCase === 'xpath') {
      return By.xpath;
    } else if (locatorTypeLowerCase === 'classname') {
      return By.className;
    } else if (locatorTypeLowerCase === 'linktext') {
      return By.linkText;
    } else if (locatorTypeLowerCase === 'name') {
      return By.name;
    } else if (locatorTypeLowerCase === 'partialLinktext') {
      return By.partialLinkText;
    } else {
      return 'LocatorType is not supported, Please check the input!!';
    }
  }

//Function to wait upto 60 secs by default to find the element, TIME can be customized by input
async function waitForElement(element, duration) {
    const byType = await getByType(element.locatorType);
    const time = duration === undefined ? 60000 : duration;
    try {
      await this.driver.wait(until.elementLocated(byType(element.locator)), time);
      return true;
    } catch (error) {
      return assert.ok(false,
        `--> Error Description: Unable to Locate Element after ${time} milliseconds!!! 
        Please find the error associated:  ${error}
        Hint:
        A: Please check your locator using Jquery once
        B: Please check the page load Time manually to wait properly for the Object
        `
      );
    }
  }


//Function to wait upto 60 secs by default to find the elements, TIME can be customized by input
async function waitForElements(element, duration) {
    const byType = await getByType(element.locatorType);
    const time = duration === undefined ? 60000 : duration;
    try {
      await this.driver.wait(until.elementsLocated(byType(element.locator)), time);
      return true;
    } catch (error) {
      return assert.ok(false,
        `--> Error Description: Unable to Locate Elements after ${time} milliseconds!!! 
        Please find the error associated:  ${error}
        Hint:
        A: Please check your locator using Jquery once
        B: Please check the page load Time manually to wait properly for the Object
        `
      );
    }
  }

// Function to find the element based upon the locator and locatorType
async function findElement(element) {
    const isElementFound = await waitForElement.call(this, element);
    const byType = await getByType(element.locatorType);
    if (isElementFound) {
      const ele = await this.driver.findElement(byType(element.locator));
      return ele;
    } else {
      throw Error('Element is not found, something happened after waiting for element, Please check!')
    }
}

/* Function to find the elements based upon the locator and locatorType */
async function findElements(elements) {
    await waitForElements.call(this, elements);
    const byType = await getByType(elements.locatorType);
    const currentElements = await this.driver.findElements(byType(elements.locator));
    return currentElements;
}

//Function to sleep for short time for loading the page 3 seconds is default value
async function waitForPageLoad(duration) {
    const time = duration === undefined ? 3000 : duration;
    await this.driver.sleep(time);
}

//Function to get the Text of an element, syncing for 200ms before getting the text 
async function getTextOfElement(element) {
    const ele = await findElement.call(this, element);
    await this.driver.sleep(200);
    const elementText = await ele.getText();
    return elementText;
}

async function getElementsCount(element){
    let elements = await this.driver.findElements(By.css(`${element}`));
    return elements.length
}

//Function to Click any element and sleeping or 500ms for sync
async function clickElement(element) {
    const ele = await findElement.call(this, element);
    ele.click();
    await this.driver.sleep(500);
  }
  
  //Function to enter Value
  async function enterValue(element, value) {
    const ele = await findElement.call(this, element);
    try {
      ele.sendKeys(value);
      await this.driver.sleep(300);
    } catch (error) {
      assert.ok(false,
        `--> Error Description: Unable to enter the Value${error}`
      );
    }
  }

  //Function to get CurrentURL
async function getCurrentUrl() {
    try {
      return this.driver.getCurrentUrl();
    } catch (error) {
      return assert.ok(false,
        `--> Error Description: Unable to get the current URL, ${error}`
      );
    }
  }

module.exports = {
    navigatePage,
    getTextOfElement,
    waitForPageLoad,
    waitForElement,
    findElements,
    getElementsCount,
    clickElement,
    enterValue,
    getCurrentUrl}