const { universalClean, bytesToSize } = require('./utils');

const collectItems = fetchedObj => fetchedObj.torrents;

const resultCleaner = (rawApiItem) => {
  const formattedItem = Object.assign({}, rawApiItem);
  const keys = Object.keys(rawApiItem);
  keys.forEach((key) => {
    switch (key) {
      case 'title': {
        formattedItem.name = universalClean('name', rawApiItem.title);
        break;
      }
      case 'episode_url': {
        formattedItem.url = rawApiItem.episode_url;
        break;
      }
      case 'seeds': {
        formattedItem.seed = universalClean('seed', rawApiItem.seeds);
        break;
      }
      case 'peers': {
        formattedItem.leech = universalClean('leech', rawApiItem.peers);
        break;
      }
      case 'imdb_id': {
        formattedItem.imdb = rawApiItem.imdb_id;
        break;
      }
      case 'size_bytes': {
        formattedItem.size = bytesToSize(rawApiItem.size_bytes);
        break;
      }
      case 'date_released_unix': {
        formattedItem.uploadDate = new Date(rawApiItem.date_released_unix * 1000);
        break;
      }
      default: {
        formattedItem[key] = universalClean(key, rawApiItem[key]);
        break;
      }
    }
  });
  formattedItem.uploadUser = 'Not Reported To Torrent Report';
  return formattedItem;
};

// eslint-disable-next-line
const listingCheck = (cleanListingObj) => false;

const eztv = {
  siteName: 'EZTV.AG',
  siteShortName: 'EZTV',
  siteUrl: 'https://eztv.ag/',
  groups: [
    {
      isApi: true,
      type: 'TV',
      groupName: 'TV',
      groupTag: 'Latest TV',
      resourceDomain: 'eztv.ag',
      webPage: 'https://eztv.ag/api/get-torrents?limit=100&page=1',
      collectItems,
      resultCleaner,
      listingCheck,
    },
    {
      isApi: true,
      type: 'TV',
      groupName: 'TV',
      groupTag: 'Latest TV',
      resourceDomain: 'eztv.ag',
      webPage: 'https://eztv.ag/api/get-torrents?limit=100&page=2',
      collectItems,
      resultCleaner,
      listingCheck,
    },
    {
      isApi: true,
      type: 'TV',
      groupName: 'TV',
      groupTag: 'Latest TV',
      resourceDomain: 'eztv.ag',
      webPage: 'https://eztv.ag/api/get-torrents?limit=100&page=3',
      collectItems,
      resultCleaner,
      listingCheck,
    },
  ],
};

module.exports = eztv;
