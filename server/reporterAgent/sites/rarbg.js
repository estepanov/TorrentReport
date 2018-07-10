const { universalClean } = require('./utils');

const resultCleaner = (rawResult) => {
  const newResult = Object.assign({}, rawResult);
  const resKeys = Object.keys(rawResult);
  resKeys.forEach((key) => {
    switch (key) {
      case 'uploadDate': {
        const uploadDate = new Date(rawResult.uploadDate);
        uploadDate.setHours(uploadDate.getHours() - 6);
        newResult.uploadDate = new Date(uploadDate);
        break;
      }
      default: {
        newResult[key] = universalClean(key, rawResult[key]);
        break;
      }
    }
  });
  return newResult;
};

const listingCheck = cleanListingObj => false;

const rarbg = {
  siteName: 'RARBG',
  siteShortName: 'RARBG',
  siteUrl: 'https://rarbg.to',
  groups: [
    {
      type: 'MOVIES',
      groupName: 'MOVIES',
      groupTag: 'Top 100 Movies',
      resourceDomain: 'rarbgmirror.com',
      webPage:
        'https://rarbgmirror.com/top100.php?category%5B%5D=14&category%5B%5D=48&category%5B%5D=17&category%5B%5D=44&category%5B%5D=45&category%5B%5D=47&category%5B%5D=50&category%5B%5D=51&category%5B%5D=52&category%5B%5D=42&category%5B%5D=46&category%5B%5D=49',
      selectors: [
        {
          label: 'name',
          query:
            'body > table:nth-child(6) > tbody > tr > td:nth-child(2) > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > a:nth-child(1)',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'uploadDate',
          query: '.lista2 > td:nth-child(3)',
          pluck: { uploadDate: 'outerText' },
        },
        {
          label: 'size',
          query: '.lista2 > td:nth-child(4)',
          pluck: { size: 'outerText' },
        },
        {
          label: 'seed',
          query: '.lista2 > td:nth-child(5)',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query: '.lista2 > td:nth-child(6)',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'uploader',
          query: '.lista2 > td:nth-child(9)',
          pluck: { uploadUser: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'TV',
      groupName: 'TV',
      groupTag: 'Top 100 TV',
      resourceDomain: 'rarbgmirror.com',
      webPage:
        'https://rarbgmirror.com/top100.php?category%5B%5D=18&category%5B%5D=41&category%5B%5D=49',
      selectors: [
        {
          label: 'name',
          query:
            'body > table:nth-child(6) > tbody > tr > td:nth-child(2) > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > a:nth-child(1)',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'uploadDate',
          query: '.lista2 > td:nth-child(3)',
          pluck: { uploadDate: 'outerText' },
        },
        {
          label: 'size',
          query: '.lista2 > td:nth-child(4)',
          pluck: { size: 'outerText' },
        },
        {
          label: 'seed',
          query: '.lista2 > td:nth-child(5)',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query: '.lista2 > td:nth-child(6)',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'uploader',
          query: '.lista2 > td:nth-child(9)',
          pluck: { uploadUser: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
  ],
};

module.exports = rarbg;
