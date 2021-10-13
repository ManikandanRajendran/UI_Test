**Project Name**  

    BDD framework for UI automation using cucumber.js


**Prerequesites**

1. [Node.js](https://nodejs.org/en/)
2. [NPM](https://www.npmjs.com/)
3. [cucumber-js](https://www.npmjs.com/package/cucumber)

**Major Packages**
```gherkin
1. cucumber - Cucumber.js is the JavaScript implementation of Cucumber and runs on the maintained Node.js versions.
2. Selenium webdriver - Webdriver for JavaScript
3. chromedriver - To interacts with chrome browser
4. cucumber-html-reporter - Generate Cucumber HTML report using bootstrap
5. assert - to validate the expected and actuals

```

**Directory Structure**
```
commons
    ├─commonFunctions.js
features
    ├─features.feature
    ├─steps
        ├─steps.js
    ├─support
        ├─world.js
        ├─hooks.js
webElements
    ├─elements.js
    ├─constants.js
report
    ├─cucumber_report.json
    ├─cucumber_report.html
cucumber.js
index.js
package.json
README.md
```
            

**Install and Run**

```js

1. Install all the packages using `npm i`
2. Run the tests using the command `npm test`
3. Run the tests and generate report `npm test && npm run report`
```

**Report**

`/report/cucumber_report.html`



