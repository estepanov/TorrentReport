const { universalClean } = require('./utils');
const { RALogger } = require('../../logging');

const collectItems = parsedObj => parsedObj.items;

const proccessItem = (rssItem) => {
  const formattedItem = Object.assign({}, rssItem);
  const keys = Object.keys(rssItem);
  keys.forEach((key) => {
    switch (key) {
      case 'title': {
        formattedItem.name = rssItem.title;
        break;
      }
      case 'link': {
        formattedItem.url = rssItem.link;
        break;
      }
      case 'isoDate': {
        formattedItem.uploadDate = new Date(rssItem.isoDate);
        formattedItem.uploadDate.setHours(formattedItem.uploadDate.getHours() - 5);
        break;
      }
      case 'enclosure': {
        formattedItem.hash = rssItem.enclosure.url.replace('https://yts.am/torrent/download/', '');
        // formattedItem.hash = rssItem.enclosure.url.split();
        break;
      }
      default: {
        break;
      }
    }
  });
  formattedItem.uploadUser = 'YTS';
  formattedItem.seed = 0;
  formattedItem.leech = 0;
  return formattedItem;
};

const threeLetterMonthToNum = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const magnetCleanup = (magnetURI) => {
  const re1 = '.*?'; // Non-greedy match on filler
  const re2 = '((?:[a-z][a-z]*[0-9]+[a-z0-9]*))'; // Alphanum 1
  const p = new RegExp(re1 + re2, ['i']);
  const m = p.exec(magnetURI);
  return m[1];
};

// eslint-disable-next-line
const listingCheck = cleanListingObj => false;

const uploadedCleanup = (uploadedString) => {
  const cleanUploadedString = uploadedString.trim();
  let newUploadDate;
  const lastTwo = cleanUploadedString.slice(-2);
  if (lastTwo === 'pm' || lastTwo === 'am') {
    // this torrent was uploaded today. sting is a time.
    const hourMinutesArr = cleanUploadedString
      .slice(0, -2)
      .split(':')
      .map(stringNum => parseInt(stringNum, 10));
    const hours = lastTwo === 'pm' ? hourMinutesArr[0] + 12 : hourMinutesArr[0];
    const minutes = hourMinutesArr[1];
    newUploadDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      hours,
      minutes,
    );
    RALogger.verbose(`------ if ------ newUploadDate: ${newUploadDate}`);
    // eslint-disable-next-line
  } else if (isNaN(parseInt(lastTwo, 10))) {
    // uploaded this month. for example: 3am Apr. 3rd
    const timeMonthDate = cleanUploadedString
      .replace('.', '')
      .replace('st', '')
      .replace('nd', '')
      .replace('rd', '')
      .replace('th', '')
      .split(' ');
    const timeEnding = timeMonthDate[0].slice(-2);
    const hours =
      timeEnding === 'am'
        ? parseInt(timeMonthDate[0].slice(0, -2), 10)
        : parseInt(timeMonthDate[0].slice(0, -2), 10) + 12;
    const month = threeLetterMonthToNum[timeMonthDate[1]];
    const date = timeMonthDate[2];
    newUploadDate = new Date(new Date().getFullYear(), month, date, hours);
    RALogger.verbose(`------ if else ------ newUploadDate: ${newUploadDate}`);
  } else {
    // only other case is upload from previous month or before.
    // for example: Mar. 13th '18
    const monthDayYear = cleanUploadedString
      .replace('.', '')
      .replace("'", '')
      .replace('st', '')
      .replace('nd', '')
      .replace('rd', '')
      .replace('th', '')
      .split(' ');

    const year = 2000 + parseInt(monthDayYear[2], 10); // assuming uploads are 2000's
    RALogger.verbose(`------ else ------ year: ${year}`);

    const month = threeLetterMonthToNum[monthDayYear[0]];
    RALogger.verbose(`------ else ------ month: ${month}`);
    const date = monthDayYear[1];
    RALogger.verbose(`------ else ------ date: ${date}`);
    newUploadDate = new Date(year, month, date);
    RALogger.verbose(`------ else ------ newUploadDate: ${newUploadDate}`);
  }
  const uploadDate = new Date(newUploadDate);
  uploadDate.setHours(uploadDate.getHours() - 5);

  return uploadDate;
};

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
        newResult.uploadDate = new Date(uploadedCleanup(rawResult.uploaded));
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

const yts = {
  siteName: 'YTS AM',
  siteShortName: 'YTS',
  siteUrl: 'https://yts.am/',
  groups: [
    {
      isRss: true,
      type: 'MOVIES',
      groupName: 'MOVIES',
      groupTag: 'New Movies',
      resourceDomain: 'yts.am',
      webPage: 'https://yts.am/rss',
      selectors: [
        {
          label: 'name',
          query:
            'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-1.name > a:nth-child(2)',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-date',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-2.seeds',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-3.leeches',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-4.size',
          pluck: { size: 'outerText' },
        },
        {
          label: 'uploader',
          query: 'body > main > div > div > div > div > table > tbody > tr > td.coll-5 > a',
          pluck: { uploadUser: 'outerText' },
        },
      ],
      collectItems,
      proccessItem,
      resultCleaner,
      listingCheck,
    },
  ],
};

module.exports = yts;
