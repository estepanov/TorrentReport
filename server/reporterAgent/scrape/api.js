const axios = require('axios');
const { RALogger } = require('../../logging');
const sequentialPromise = require('../utils/sequentialPromise');


const addKeysToEveryItemFacttoryFunc = (typeId, groupId, siteId) => (item) => {
  const newItem = Object.assign({}, item);
  newItem.torrentGroupId = groupId;
  newItem.torrentSiteId = siteId;
  newItem.typeId = typeId;
  return newItem;
};

const APIScrape = ({
  typeId,
  groupId,
  siteId,
  groupName,
  groupTag,
  resourceDomain,
  webPage,
  collectItems,
}) => {
  const addToKeys = addKeysToEveryItemFacttoryFunc(typeId, groupId, siteId);
  RALogger.verbose(`start API scrape | groupName: ${groupName} | resourceDomain: ${resourceDomain}`);
  return axios
    .get(webPage)
    .then(res => res.data)
    .then(collectItems)
    .then(itemsArr => sequentialPromise(itemsArr, addToKeys))
    .catch((err) => {
      RALogger.error(`Error in API Parse - webPage: ${webPage}`);
      RALogger.error(err);
      return { skip: true };
    });
};

module.exports = APIScrape;
