const { universalClean } = require('./utils');

const listingCheck = cleanListingObj =>
  cleanListingObj.category.includes('porn') || cleanListingObj.category.includes('Porn');

const resultCleaner = (rawResult) => {
  const newResult = Object.assign({}, rawResult);
  const resKeys = Object.keys(rawResult);
  resKeys.forEach((key) => {
    switch (key) {
      case 'magnet': {
        newResult.hash = magnetCleanup(rawResult.magnet);
        break;
      }
      case 'category': {
        newResult.category = rawResult.category.replace(/\n/g, ' ').trim();
        break;
      }
      case 'uploaded': {
        delete newResult.uploaded;
        const clean = uploadedCleanup(rawResult.uploaded);
        newResult.uploadDate = clean.uploadDate;
        newResult.uploadUser = clean.uploadUser;
        newResult.size = clean.size;
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

const tpb = {
  siteName: 'The Pirate Bay',
  siteShortName: 'TPB',
  siteUrl: 'https://thepiratebay.org/',
  groups: [
    {
      type: 'MUSIC',
      groupName: 'MUSIC',
      groupTag: 'Top 100 MUSIC',
      resourceDomain: 'thepiratebay.org',
      webPage: 'https://thepiratebay.org/top/101',
      selectors: [
        {
          label: 'name',
          query: '#searchResult > tbody > tr > td:nth-child(2) > div > a',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'category',
          query: '#searchResult > tbody > tr > td:nth-child(1)',
          pluck: { category: 'outerText' },
        },
        {
          label: 'magnet',
          query: '#searchResult > tbody > tr > td:nth-child(2) > a:nth-child(2)',
          pluck: { magnet: 'href' },
        },
        {
          label: 'uploaded',
          query: '#searchResult > tbody > tr > td:nth-child(2) > .detDesc',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query: '#searchResult > tbody > tr > td:nth-child(3)',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query: '#searchResult > tbody > tr > td:nth-child(4)',
          pluck: { leech: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'TV',
      groupName: 'TV',
      groupTag: 'Top 100 HD TV',
      resourceDomain: 'thepiratebay.org',
      webPage: 'https://thepiratebay.org/top/208',
      selectors: [
        {
          label: 'name',
          query: '#searchResult > tbody > tr > td:nth-child(2) > div > a',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'category',
          query: '#searchResult > tbody > tr > td:nth-child(1)',
          pluck: { category: 'outerText' },
        },
        {
          label: 'magnet',
          query: '#searchResult > tbody > tr > td:nth-child(2) > a:nth-child(2)',
          pluck: { magnet: 'href' },
        },
        {
          label: 'uploaded',
          query: '#searchResult > tbody > tr > td:nth-child(2) > .detDesc',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query: '#searchResult > tbody > tr > td:nth-child(3)',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query: '#searchResult > tbody > tr > td:nth-child(4)',
          pluck: { leech: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'TV',
      groupName: 'TV',
      groupTag: 'Top 100 TV',
      resourceDomain: 'thepiratebay.org',
      webPage: 'https://thepiratebay.org/top/205',
      selectors: [
        {
          label: 'name',
          query: '#searchResult > tbody > tr > td:nth-child(2) > div > a',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'category',
          query: '#searchResult > tbody > tr > td:nth-child(1)',
          pluck: { category: 'outerText' },
        },
        {
          label: 'magnet',
          query: '#searchResult > tbody > tr > td:nth-child(2) > a:nth-child(2)',
          pluck: { magnet: 'href' },
        },
        {
          label: 'uploaded',
          query: '#searchResult > tbody > tr > td:nth-child(2) > .detDesc',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query: '#searchResult > tbody > tr > td:nth-child(3)',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query: '#searchResult > tbody > tr > td:nth-child(4)',
          pluck: { leech: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'VIDEO',
      groupName: 'VIDEOS',
      groupTag: 'Top 100 VIDEOS',
      resourceDomain: 'thepiratebay.org',
      webPage: 'https://thepiratebay.org/top/200',
      selectors: [
        {
          label: 'name',
          query: '#searchResult > tbody > tr > td:nth-child(2) > div > a',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'category',
          query: '#searchResult > tbody > tr > td:nth-child(1)',
          pluck: { category: 'outerText' },
        },
        {
          label: 'magnet',
          query: '#searchResult > tbody > tr > td:nth-child(2) > a:nth-child(2)',
          pluck: { magnet: 'href' },
        },
        {
          label: 'uploaded',
          query: '#searchResult > tbody > tr > td:nth-child(2) > .detDesc',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query: '#searchResult > tbody > tr > td:nth-child(3)',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query: '#searchResult > tbody > tr > td:nth-child(4)',
          pluck: { leech: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'MOVIES',
      groupName: 'MOVIES',
      groupTag: 'Top 100 MOVIES',
      resourceDomain: 'thepiratebay.org',
      webPage: 'https://thepiratebay.org/top/201',
      selectors: [
        {
          label: 'name',
          query: '#searchResult > tbody > tr > td:nth-child(2) > div > a',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'category',
          query: '#searchResult > tbody > tr > td:nth-child(1)',
          pluck: { category: 'outerText' },
        },
        {
          label: 'magnet',
          query: '#searchResult > tbody > tr > td:nth-child(2) > a:nth-child(2)',
          pluck: { magnet: 'href' },
        },
        {
          label: 'uploaded',
          query: '#searchResult > tbody > tr > td:nth-child(2) > .detDesc',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query: '#searchResult > tbody > tr > td:nth-child(3)',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query: '#searchResult > tbody > tr > td:nth-child(4)',
          pluck: { leech: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'MOVIES',
      groupName: 'MOVIES',
      groupTag: 'Top 100 HD MOVIES',
      resourceDomain: 'thepiratebay.org',
      webPage: 'https://thepiratebay.org/top/207',
      selectors: [
        {
          label: 'name',
          query: '#searchResult > tbody > tr > td:nth-child(2) > div > a',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'category',
          query: '#searchResult > tbody > tr > td:nth-child(1)',
          pluck: { category: 'outerText' },
        },
        {
          label: 'magnet',
          query: '#searchResult > tbody > tr > td:nth-child(2) > a:nth-child(2)',
          pluck: { magnet: 'href' },
        },
        {
          label: 'uploaded',
          query: '#searchResult > tbody > tr > td:nth-child(2) > .detDesc',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query: '#searchResult > tbody > tr > td:nth-child(3)',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query: '#searchResult > tbody > tr > td:nth-child(4)',
          pluck: { leech: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
  ],
};

const magnetCleanup = (magnetURI) => {
  const re1 = '.*?'; // Non-greedy match on filler
  const re2 = '((?:[a-z][a-z]*[0-9]+[a-z0-9]*))'; // Alphanum 1
  const p = new RegExp(re1 + re2, ['i']);
  const m = p.exec(magnetURI);
  return m[1];
};

const uploadedCleanup = (uploadedString) => {
  const infoArr = /.*Uploaded\s+(.*),\sSize\s+(.*),\sULed by\s+(.*).*/.exec(uploadedString);
  const spaceRegEx = /(.*)\s(.*)/;
  const hyphenRegEx = /(.*)-(.*)/;
  const colonRegEx = /(.*):(.*)/;

  // const uploadedDate = infoArr && infoArr.length ? infoArr[1] : new Date();
  const uploadedDate = infoArr[1];
  const upMonthDateHourMinute = uploadedDate.split(spaceRegEx);
  upMonthDateHourMinute.splice(0, 1);
  upMonthDateHourMinute.splice(2, 1);
  const upMonthDate = upMonthDateHourMinute[0].split(hyphenRegEx);
  upMonthDate.splice(0, 1);
  upMonthDate.splice(2, 1);
  // JS date is 0 based so -1
  const upMonth = upMonthDate[0] - 1;
  const upDate = upMonthDate[1];
  const upHourMinute = upMonthDateHourMinute[1].split(colonRegEx);
  upHourMinute.splice(0, 1);
  upHourMinute.splice(2, 1);
  const upHour = upHourMinute[0];
  const upMinute = upHourMinute[1];
  let newUploadDate;
  if (upMonthDateHourMinute[0] === 'Y-day') {
    newUploadDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 1,
      upHour,
      upMinute,
    );
  } else if (upMonthDateHourMinute[0] === 'Today') {
    newUploadDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      upHour,
      upMinute,
    );
  } else if (upMonthDateHourMinute[1].includes(':')) {
    newUploadDate = new Date(new Date().getFullYear(), upMonth, upDate, upHour, upMinute);
  } else {
    newUploadDate = new Date(upMonthDateHourMinute[1], upMonth, upDate, 0, 0);
  }

  // adjust for TPB servers time zone

  const uploadDate = new Date(newUploadDate);
  uploadDate.setHours(uploadDate.getHours() - 5);
  const finalUploadDate = new Date(uploadDate);

  return {
    uploadDate: finalUploadDate,
    uploadUser: infoArr[3],
    size: infoArr[2].replace('GiB', 'GB').replace('MiB', 'MB'),
  };
};

module.exports = tpb;
