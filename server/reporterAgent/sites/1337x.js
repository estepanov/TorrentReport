const { universalClean } = require('./utils');
const { RALogger } = require('../../logging');

const magnetCleanup = (magnetURI) => {
  const re1 = '.*?'; // Non-greedy match on filler
  const re2 = '((?:[a-z][a-z]*[0-9]+[a-z0-9]*))'; // Alphanum 1
  const p = new RegExp(re1 + re2, ['i']);
  const m = p.exec(magnetURI);
  return m[1];
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

// eslint-disable-next-line
const listingCheck = cleanListingObj => false;

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

const leet1337x = {
  siteName: '1337x',
  siteShortName: '1337x',
  siteUrl: 'https://1337x.to/',
  groups: [
    // {
    //   type: 'MOVIES',
    //   groupName: 'MOVIES',
    //   groupTag: 'Popular Movies - 24 Hours',
    //   resourceDomain: '1337x.to',
    //   webPage: 'https://1337x.to/popular-movies',
    //   selectors: [
    //     {
    //       label: 'name',
    //       query:
    //         'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-1.name > a:nth-child(2)',
    //       pluck: { name: 'outerText', url: 'href' },
    //     },
    //     {
    //       label: 'uploaded',
    //       query:
    //         'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-date',
    //       pluck: { uploaded: 'outerText' },
    //     },
    //     {
    //       label: 'seed',
    //       query:
    //         'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-2.seeds',
    //       pluck: { seed: 'outerText' },
    //     },
    //     {
    //       label: 'leech',
    //       query:
    //         'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-3.leeches',
    //       pluck: { leech: 'outerText' },
    //     },
    //     {
    //       label: 'size',
    //       query:
    //         'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-4.size',
    //       pluck: { size: 'outerText' },
    //     },
    //     {
    //       label: 'uploader',
    //       query: 'body > main > div > div > div > div > table > tbody > tr > td.coll-5 > a',
    //       pluck: { uploadUser: 'outerText' },
    //     },
    //   ],
    //   resultCleaner,
    //   listingCheck,
    // },
    // {
    //   type: 'MOVIES',
    //   groupName: 'MOVIES',
    //   groupTag: 'Top 100 Movies',
    //   resourceDomain: '1337x.to',
    //   webPage: 'https://1337x.to/top-100-movies',
    //   selectors: [
    //     {
    //       label: 'name',
    //       query:
    //         'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-1.name > a:nth-child(2)',
    //       pluck: { name: 'outerText', url: 'href' },
    //     },
    //     {
    //       label: 'uploaded',
    //       query:
    //         'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-date',
    //       pluck: { uploaded: 'outerText' },
    //     },
    //     {
    //       label: 'seed',
    //       query:
    //         'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-2.seeds',
    //       pluck: { seed: 'outerText' },
    //     },
    //     {
    //       label: 'leech',
    //       query:
    //         'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-3.leeches',
    //       pluck: { leech: 'outerText' },
    //     },
    //     {
    //       label: 'size',
    //       query:
    //         'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-4.size',
    //       pluck: { size: 'outerText' },
    //     },
    //     {
    //       label: 'uploader',
    //       query: 'body > main > div > div > div > div > table > tbody > tr > td.coll-5 > a',
    //       pluck: { uploadUser: 'outerText' },
    //     },
    //   ],
    //   resultCleaner,
    //   listingCheck,
    // },
    // {
    //   type: 'TV',
    //   groupName: 'TV',
    //   groupTag: 'Top 100 TV',
    //   resourceDomain: '1337x.to',
    //   webPage: 'https://1337x.to/top-100-television',
    //   selectors: [
    //     {
    //       label: 'name',
    //       query:
    //         'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-1.name > a:nth-child(2)',
    //       pluck: { name: 'outerText', url: 'href' },
    //     },
    //     {
    //       label: 'uploaded',
    //       query:
    //         'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-date',
    //       pluck: { uploaded: 'outerText' },
    //     },
    //     {
    //       label: 'seed',
    //       query:
    //         'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-2.seeds',
    //       pluck: { seed: 'outerText' },
    //     },
    //     {
    //       label: 'leech',
    //       query:
    //         'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-3.leeches',
    //       pluck: { leech: 'outerText' },
    //     },
    //     {
    //       label: 'size',
    //       query:
    //         'body > main > div > div > div.featured-list > div > table > tbody > tr > td.coll-4.size',
    //       pluck: { size: 'outerText' },
    //     },
    //     {
    //       label: 'uploader',
    //       query: 'body > main > div > div > div > div > table > tbody > tr > td.coll-5 > a',
    //       pluck: { uploadUser: 'outerText' },
    //     },
    //   ],
    //   resultCleaner,
    //   listingCheck,
    // },
    {
      type: 'TV',
      groupName: 'TV',
      groupTag: 'Latest TV',
      resourceDomain: '1337x.to',
      webPage: 'https://1337x.to/sort-cat/TV/time/desc/1/', // search page so selectors are different
      selectors: [
        {
          label: 'name',
          query:
            'body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr > td.coll-1.name > a:nth-child(2)',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr > td.coll-date',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr > td.coll-2.seeds',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr > td.coll-3.leeches',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > main > div > div > div > div.box-info-detail.inner-table > div > table > tbody > tr > td.coll-4',
          pluck: { size: 'outerText' },
        },
        {
          label: 'uploader',
          query:
            'body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr > td.coll-5 > a',
          pluck: { uploadUser: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'TV',
      groupName: 'TV',
      groupTag: 'Latest TV',
      resourceDomain: '1337x.to',
      webPage: 'https://1337x.to/sort-cat/TV/time/desc/2/', // search page so selectors are different
      selectors: [
        {
          label: 'name',
          query:
            'body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr > td.coll-1.name > a:nth-child(2)',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr > td.coll-date',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr > td.coll-2.seeds',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr > td.coll-3.leeches',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > main > div > div > div > div.box-info-detail.inner-table > div > table > tbody > tr > td.coll-4',
          pluck: { size: 'outerText' },
        },
        {
          label: 'uploader',
          query:
            'body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr > td.coll-5 > a',
          pluck: { uploadUser: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'TV',
      groupName: 'TV',
      groupTag: 'Latest TV',
      resourceDomain: '1337x.to',
      webPage: 'https://1337x.to/sort-cat/TV/time/desc/3/', // search page so selectors are different
      selectors: [
        {
          label: 'name',
          query:
            'body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr > td.coll-1.name > a:nth-child(2)',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr > td.coll-date',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr > td.coll-2.seeds',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr > td.coll-3.leeches',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > main > div > div > div > div.box-info-detail.inner-table > div > table > tbody > tr > td.coll-4',
          pluck: { size: 'outerText' },
        },
        {
          label: 'uploader',
          query:
            'body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr > td.coll-5 > a',
          pluck: { uploadUser: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'MOVIES',
      groupName: 'MOVIES',
      groupTag: 'Trending Movies',
      resourceDomain: '1337x.to',
      webPage: 'https://1337x.to/trending/d/movies/', // trending page so selectors are different
      selectors: [
        {
          label: 'name',
          query:
            'body > main > div > div > div.featured-list.trending-torrent > div.table-list-wrap > table > tbody > tr > td.coll-1.name > a',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > main > div > div > div.featured-list.trending-torrent > div.table-list-wrap > table > tbody > tr > td.coll-date',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > main > div > div > div.featured-list.trending-torrent > div.table-list-wrap > table > tbody > tr > td.coll-2.seeds',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > main > div > div > div.featured-list.trending-torrent > div.table-list-wrap > table > tbody > tr > td.coll-3.leeches',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > main > div > div > div.featured-list.trending-torrent > div.table-list-wrap > table > tbody > tr > td.coll-4.size',
          pluck: { size: 'outerText' },
        },
        {
          label: 'uploader',
          query:
            'body > main > div > div > div.featured-list.trending-torrent > div.table-list-wrap > table > tbody > tr > td.coll-5 > a',
          pluck: { uploadUser: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
  ],
};

module.exports = leet1337x;
