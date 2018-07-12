const moment = require('moment');

const { universalClean } = require('./utils');
const { RALogger } = require('../../logging');


const uploadedCleanup = (uploadedString) => {
  const cleanUploadedString = uploadedString.trim().toLowerCase();
  let uploadDate;
  if (cleanUploadedString === 'today') {
    uploadDate = new Date();
  } else if (cleanUploadedString === 'yesterday') {
    uploadDate = moment().subtract(1, 'day');
  } else if (cleanUploadedString.includes('min')) {
    const mins = parseInt(cleanUploadedString.slice(0, -4), 10);
    uploadDate = moment().subtract(mins, 'minutes');
  } else if (cleanUploadedString.includes('hours')) {
    const hours = parseInt(cleanUploadedString.slice(0, -6), 10);
    uploadDate = moment().subtract(hours, 'hours');
  } else if (cleanUploadedString.includes('hour')) {
    uploadDate = moment().subtract(1, 'hour');
  } else {
    uploadDate = moment(cleanUploadedString, 'MM/DD/YYYY').toDate();
  }
  return new Date(uploadDate);
};

const classNameToCategory = (className) => {
  const cleanClassName = className.trim().toLowerCase()
  const key = {
    tv1: 'Movies',
    tv2: 'Music',
    tv3: 'TV',
    tv4: 'Games',
    tv5: 'Software',
    tv6: 'Anime',
    tv7: 'porn',
    tv8: 'eBooks',
  };
  if (!key[cleanClassName]) return 'Unknown';
  return key[cleanClassName];
};

const listingCheck = cleanListingObj => cleanListingObj.category === 'porn';

const resultCleaner = (rawResult) => {
  const newResult = Object.assign({}, rawResult);
  const resKeys = Object.keys(rawResult);
  resKeys.forEach((key) => {
    switch (key) {
      case 'category': {
        newResult.category = classNameToCategory(rawResult.category)
        break;
      }
      case 'uploaded': {
        delete newResult.uploaded;
        newResult.uploadDate = uploadedCleanup(rawResult.uploaded);
        break;
      }
      default: {
        newResult[key] = universalClean(key, rawResult[key]);
        break;
      }
    }
  });
  newResult.uploadUser = 'Not Reported To Torrent Report';
  return newResult;
};

const torLock = {
  siteName: 'TorLock',
  siteShortName: 'TorLock',
  siteUrl: 'https://www.torlock.com/',
  groups: [
    {
      type: 'Movies',
      groupName: 'Movies',
      groupTag: 'Popular Movies',
      resourceDomain: 'torlock.com',
      webPage: 'https://www.torlock.com/movies.html',
      selectors: [
        {
          label: 'category',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > span',
          pluck: { category: 'className' },
        },
        {
          label: 'name',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a > b',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'url',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a',
          pluck: { url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.td',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tul',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tdl',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.ts',
          pluck: { size: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'Movies',
      groupName: 'Movies',
      groupTag: 'Popular Movies',
      resourceDomain: 'torlock.com',
      webPage: 'https://www.torlock.com/movies/2.html',
      selectors: [
        {
          label: 'category',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > span',
          pluck: { category: 'className' },
        },
        {
          label: 'name',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a > b',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'url',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a',
          pluck: { url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.td',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tul',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tdl',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.ts',
          pluck: { size: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'Movies',
      groupName: 'Movies',
      groupTag: 'Popular Movies',
      resourceDomain: 'torlock.com',
      webPage: 'https://www.torlock.com/movies/3.html',
      selectors: [
        {
          label: 'category',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > span',
          pluck: { category: 'className' },
        },
        {
          label: 'name',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a > b',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'url',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a',
          pluck: { url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.td',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tul',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tdl',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.ts',
          pluck: { size: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'Movies',
      groupName: 'Movies',
      groupTag: 'Recent Movies',
      resourceDomain: 'torlock.com',
      webPage: 'https://www.torlock.com/movies/recent.html',
      selectors: [
        {
          label: 'category',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > span',
          pluck: { category: 'className' },
        },
        {
          label: 'name',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a > b',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'url',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a',
          pluck: { url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.td',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tul',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tdl',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.ts',
          pluck: { size: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'Movies',
      groupName: 'Movies',
      groupTag: 'Recent Movies',
      resourceDomain: 'torlock.com',
      webPage: 'https://www.torlock.com/movies/recent/2.html',
      selectors: [
        {
          label: 'category',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > span',
          pluck: { category: 'className' },
        },
        {
          label: 'name',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a > b',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'url',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a',
          pluck: { url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.td',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tul',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tdl',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.ts',
          pluck: { size: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'Movies',
      groupName: 'Movies',
      groupTag: 'Recent Movies',
      resourceDomain: 'torlock.com',
      webPage: 'https://www.torlock.com/movies/recent/3.html',
      selectors: [
        {
          label: 'category',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > span',
          pluck: { category: 'className' },
        },
        {
          label: 'name',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a > b',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'url',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a',
          pluck: { url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.td',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tul',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tdl',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.ts',
          pluck: { size: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'TV',
      groupName: 'TV',
      groupTag: 'Popular TV',
      resourceDomain: 'torlock.com',
      webPage: 'https://www.torlock.com/television.html',
      selectors: [
        {
          label: 'category',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > span',
          pluck: { category: 'className' },
        },
        {
          label: 'name',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a > b',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'url',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a',
          pluck: { url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.td',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tul',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tdl',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.ts',
          pluck: { size: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'TV',
      groupName: 'TV',
      groupTag: 'Popular TV',
      resourceDomain: 'torlock.com',
      webPage: 'https://www.torlock.com/television/2.html',
      selectors: [
        {
          label: 'category',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > span',
          pluck: { category: 'className' },
        },
        {
          label: 'name',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a > b',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'url',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a',
          pluck: { url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.td',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tul',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tdl',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.ts',
          pluck: { size: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'TV',
      groupName: 'TV',
      groupTag: 'Popular TV',
      resourceDomain: 'torlock.com',
      webPage: 'https://www.torlock.com/television/3.html',
      selectors: [
        {
          label: 'category',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > span',
          pluck: { category: 'className' },
        },
        {
          label: 'name',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a > b',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'url',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a',
          pluck: { url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.td',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tul',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tdl',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.ts',
          pluck: { size: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'TV',
      groupName: 'TV',
      groupTag: 'Recent TV',
      resourceDomain: 'torlock.com',
      webPage: 'https://www.torlock.com/television/recent.html',
      selectors: [
        {
          label: 'category',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > span',
          pluck: { category: 'className' },
        },
        {
          label: 'name',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a > b',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'url',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a',
          pluck: { url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.td',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tul',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tdl',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.ts',
          pluck: { size: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'TV',
      groupName: 'TV',
      groupTag: 'Recent TV',
      resourceDomain: 'torlock.com',
      webPage: 'https://www.torlock.com/television/recent/2.html',
      selectors: [
        {
          label: 'category',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > span',
          pluck: { category: 'className' },
        },
        {
          label: 'name',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a > b',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'url',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a',
          pluck: { url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.td',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tul',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tdl',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.ts',
          pluck: { size: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'TV',
      groupName: 'TV',
      groupTag: 'Recent TV',
      resourceDomain: 'torlock.com',
      webPage: 'https://www.torlock.com/television/recent/3.html',
      selectors: [
        {
          label: 'category',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > span',
          pluck: { category: 'className' },
        },
        {
          label: 'name',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a > b',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'url',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a',
          pluck: { url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.td',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tul',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tdl',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.ts',
          pluck: { size: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'Music',
      groupName: 'Music',
      groupTag: 'Popular Music',
      resourceDomain: 'torlock.com',
      webPage: 'https://www.torlock.com/music.html',
      selectors: [
        {
          label: 'category',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > span',
          pluck: { category: 'className' },
        },
        {
          label: 'name',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a > b',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'url',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a',
          pluck: { url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.td',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tul',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tdl',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.ts',
          pluck: { size: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'Music',
      groupName: 'Music',
      groupTag: 'Popular Music',
      resourceDomain: 'torlock.com',
      webPage: 'https://www.torlock.com/music/2.html',
      selectors: [
        {
          label: 'category',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > span',
          pluck: { category: 'className' },
        },
        {
          label: 'name',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a > b',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'url',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a',
          pluck: { url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.td',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tul',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tdl',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.ts',
          pluck: { size: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'Music',
      groupName: 'Music',
      groupTag: 'Recent Music',
      resourceDomain: 'torlock.com',
      webPage: 'https://www.torlock.com/music/recent.html',
      selectors: [
        {
          label: 'category',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > span',
          pluck: { category: 'className' },
        },
        {
          label: 'name',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a > b',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'url',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a',
          pluck: { url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.td',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tul',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tdl',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.ts',
          pluck: { size: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
    {
      type: 'Music',
      groupName: 'Music',
      groupTag: 'Recent Music',
      resourceDomain: 'torlock.com',
      webPage: 'https://www.torlock.com/music/recent/2.html',
      selectors: [
        {
          label: 'category',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > span',
          pluck: { category: 'className' },
        },
        {
          label: 'name',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a > b',
          pluck: { name: 'outerText', url: 'href' },
        },
        {
          label: 'url',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td:nth-child(1) > div:nth-child(1) > a',
          pluck: { url: 'href' },
        },
        {
          label: 'uploaded',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.td',
          pluck: { uploaded: 'outerText' },
        },
        {
          label: 'seed',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tul',
          pluck: { seed: 'outerText' },
        },
        {
          label: 'leech',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.tdl',
          pluck: { leech: 'outerText' },
        },
        {
          label: 'size',
          query:
            'body > article > div.table-responsive > table.table.table-striped.table-bordered.table-hover.table-condensed > tbody > tr > td.ts',
          pluck: { size: 'outerText' },
        },
      ],
      resultCleaner,
      listingCheck,
    },
  ],
};

module.exports = torLock;
