const puppet = require('./puppet');
const rss = require('./rss');
const api = require('./api');

const sequentialPromise = require('../utils/sequentialPromise');
const cleanCheckSave = require('../utils/cleanCheckSave');
const filterSkip = require('../utils/filterSkip');

const scrapeSwitchBoard = (siteGroupObj) => {
  console.log(` switchboard webPage - ${siteGroupObj.webPage} - ${siteGroupObj.isRss}`);
  if (siteGroupObj.isRss) return rss(siteGroupObj);
  if (siteGroupObj.isApi) return api(siteGroupObj);
  return puppet(siteGroupObj);
};

const scrape = siteGroupObj =>
  scrapeSwitchBoard(siteGroupObj)
    .then(filterSkip)
    .then((rawItemsArr) => {
      console.log('rawItemsArr', rawItemsArr.length);
      console.log(rawItemsArr.length && rawItemsArr[0]);
      const boundCCS = listing =>
        cleanCheckSave(siteGroupObj.resultCleaner, siteGroupObj.listingCheck, listing);
      console.log('siteGroupObj.groupTag - ', siteGroupObj.groupTag);
      return sequentialPromise(rawItemsArr, boundCCS);
    })
    .then(data => filterSkip(data))
    .then((finalFullItems) => {
      console.log('hit finalFullItems - ', finalFullItems.length);
      // console.log(finalFullItems.length && finalFullItems[0]);
      const newSiteGroupObj = Object.assign({}, siteGroupObj);
      newSiteGroupObj.results = finalFullItems;
      return newSiteGroupObj;
    });

module.exports = scrape;
