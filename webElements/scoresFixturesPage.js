const fixturesPageElements = {
    today:{
        locator:`.sp-c-date-picker-timeline__item--selected.sp-c-date-picker-timeline__item--current  span:nth-of-type(1)`,
        locatorType:`css`
    },
    numberOfMatches: {
        locator:`div:nth-of-type(3) .qa-match-block`,
        locatorType: `css`
    },
     matchTitle:{
         locator:`div:nth-of-type(3) .qa-match-block:nth-of-type(X) h3`,
         locatorType:`css`
     },
     teamNamesUlCount:{
         locator:`div:nth-of-type(3) .qa-match-block:nth-of-type(X)>ul li`,
         locatorType:`css`
     },
     teamNamesUlDiv:{
        locator:`div:nth-of-type(3) .qa-match-block:nth-of-type(X)>div>ul li`,
        locatorType:`css`
    },
     teamNamesUl:{
        locator:`div:nth-of-type(3) .qa-match-block:nth-of-type(2)>ul li:nth-of-type(X)`,
        locatorType:`css`
    },
    searchField:{
        locator:`#orb-search-q`,
        locatorType:`css`
    },
    searchButton:{
        locator:`.se-searchbox__submit`,
        locatorType:`css`
    },
    searchResultList:{
        locator:`div[width="compact"] ul[role="list"] li`,
        locatorType:`css`
    },
    goToSignIn:{
        locator:`#idcta-username`,
        locatorType:`css`
    },
    emailField:{
        locator:`#user-identifier-input`,
        locatorType:`css`
    },
    emailErrorElement:{
        locator:`.form-message--username p`,
        locatorType:`css`
    },
    passwordField:{
        locator:`#password-input`,
        locatorType:`css`
    },
    passwordErrorElement:{
        locator:`.form-message--password p`,
        locatorType:'css'
    },
    submitButton:{
        locator:`#submit-button`,
        locatorType:`css`
    }

  };
  
 module.exports = {fixturesPageElements};