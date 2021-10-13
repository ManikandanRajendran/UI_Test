const fixturesPageElements = {
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
    }
  };
  
 module.exports = {fixturesPageElements};