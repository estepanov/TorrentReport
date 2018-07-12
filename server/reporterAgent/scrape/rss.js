const RssParser = require('rss-parser');
const { RALogger } = require('../../logging');
const sequentialPromise = require('../utils/sequentialPromise');

const parser = new RssParser();

const addKeysToEveryItemFacttoryFunc = (typeId, groupId, siteId) => (item) => {
  const newItem = Object.assign({}, item);
  newItem.torrentGroupId = groupId;
  newItem.torrentSiteId = siteId;
  newItem.typeId = typeId;
  return newItem;
};

const rssScrape = ({
  typeId,
  groupId,
  siteId,
  groupName,
  groupTag,
  resourceDomain,
  webPage,
  collectItems,
  proccessItem,
}) => {
  const addToKeys = addKeysToEveryItemFacttoryFunc(typeId, groupId, siteId);
  RALogger.verbose(`start RSS scrape | groupName: ${groupName} | resourceDomain: ${resourceDomain}`);
  return parser
    .parseURL(webPage)
    .then(collectItems)
    .then(itemsArr => sequentialPromise(itemsArr, addToKeys))
    .then(itemsArr => sequentialPromise(itemsArr, proccessItem));
};

module.exports = rssScrape;
