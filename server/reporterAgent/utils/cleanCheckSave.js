const { RALogger } = require('../../logging');
const getOrMakeTorrentListing = require('../fetchOrMake/torrentListing');
const addOrSetUser = require('../fetchOrMake/torrentUser');

/**
 * Cleans and checks listing object. Then finds or makes new torrentListing,
 * then finds or makes uploading user and attaches to listing object.
 * @param {Function} resultCleaner Invoked on listObj to stanardise input.
 * @param {Function} listingCheck Invoked on listObj to check if we should keep it.
 * @param {Object} listObj Listing object to check and make.
 */
const cleanCheckSave = (resultCleaner, listingCheck, listObj) => {
  const cleanObject = resultCleaner(listObj);
  const shouldSkip = listingCheck(cleanObject);
  let lastResult;
  if (shouldSkip) return { skip: true };
  return getOrMakeTorrentListing(cleanObject)
    .then((newListing) => {
      lastResult = Object.assign({}, newListing);
      return newListing;
    })
    .then(addOrSetUser)
    .then(() => lastResult)
    .catch((err) => {
      RALogger.error(' !!!!!!!!! error in cleanCheckSave');
      RALogger.error('cleanObject');
      RALogger.error(cleanObject);
      RALogger.error('lastResult:');
      RALogger.error(lastResult);
      RALogger.error('listObj:');
      RALogger.error(listObj);
      RALogger.error(err);
      return { skip: true };
    });
};

module.exports = cleanCheckSave;
