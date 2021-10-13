var webdriver = require('selenium-webdriver');
var{setWorldConstructor} = require('@cucumber/cucumber');
var{setDefaultTimeout}=require('@cucumber/cucumber');
var {BeforeAll} = require('@cucumber/cucumber');

  
  function driverWorld(){
      this.driver = new webdriver.Builder().forBrowser('chrome').build();
      this.driver.manage().window().maximize();
      this.GLOBAL = {};       
  };
  
  setDefaultTimeout(60 * 1000);
  setWorldConstructor(driverWorld);


