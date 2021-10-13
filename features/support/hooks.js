const {Before, After} = require('@cucumber/cucumber');

Before(async function(){
    this.driver.manage().deleteAllCookies();
});

After(async function() {
  if(this.driver !=null){
    await this.driver.quit();
  }
});