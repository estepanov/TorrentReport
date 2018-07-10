const { RALogger } = require('../../logging');
const sequentialPromise = require('../utils/sequentialPromise');
const scrape = require('./scrape');
// const randomNumber = require('../utils/randomNumber');

/**
 * Calls scrape on every item in group array for site.
 * Returns new site object with scrape results.
 * @param {Object} siteObj
 */
const scrapeSite = (siteObj) => {
  const newSiteObj = Object.assign({}, siteObj);
  return sequentialPromise(siteObj.groups, scrape, 5000)
    .then((groupScraped) => {
      newSiteObj.groups = groupScraped;
      RALogger.verbose(`++++created ${newSiteObj.groups.length} groups`);
      return newSiteObj;
    })
    .catch((err) => {
      RALogger.error('! error in scrape site !');
      RALogger.error(newSiteObj);
      RALogger.error(err);
      return { skip: true };
    });
};

module.exports = scrapeSite;
