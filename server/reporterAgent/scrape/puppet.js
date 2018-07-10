/* eslint-disable no-await-in-loop */
const { RALogger } = require('../../logging');
const puppeteer = require('puppeteer');
const { randomResolution, randomAgent } = require('../utils/randomBrowser');

const pageConsole = (msg) => {
  if (msg !== 'PAGE LOG: Failed to load resource: net::ERR_FAILED') {
    console.log('PAGE LOG:', msg.text());
  }
};

const minimumArrLength = (smallest, currentVal) => {
  const currValLen = currentVal.length;
  const isSmaller = currValLen < smallest;
  return isSmaller ? currValLen : smallest;
};

const puppet = async ({
  typeId,
  groupId,
  siteId,
  groupName,
  groupTag,
  resourceDomain,
  webPage,
  selectors,
}) => {
  RALogger.verbose(`start scrape | groupName: ${groupName} | resourceDomain: ${resourceDomain} | selectCount: ${
    selectors.length
  }`);

  let blocked = false;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setUserAgent(randomAgent());
    await page.setViewport(randomResolution());
    await page.setRequestInterception(true);
    page.on('console', pageConsole);
    page.on('request', (interceptedRequest) => {
      if (
        !interceptedRequest.url().includes(resourceDomain) ||
        interceptedRequest.url().endsWith('.ico') ||
        interceptedRequest.url().endsWith('.png') ||
        interceptedRequest.url().endsWith('.jpg') ||
        interceptedRequest.url().endsWith('.mp3') ||
        interceptedRequest.url().endsWith('.css') ||
        interceptedRequest.url().endsWith('.swf') ||
        interceptedRequest.url().endsWith('.mp4') ||
        interceptedRequest.url().endsWith('.gif')
      ) {
        interceptedRequest.abort();
      } else {
        interceptedRequest.continue();
      }
    });
    await page.goto(webPage, {
      timeout: 90000,
    });
    await page.waitFor(12000);

    // this is to check if blocked currently for rarbg
    try {
      const messageCheck = await page.$eval('body > div > div > b', obj => obj.innerText);
      if (messageCheck === 'There is something wrong with your browser!') blocked = true;
      console.log(` ------------------> >>>>>>>>>>>>>>>>> ${messageCheck}`);
      console.log(blocked);
      console.log('------------------------ <<<<<<<<<<<<<');
    } catch (err) {
      console.log('I dont think we are blocked!');
    }

    const pageEvalFunc = (results, pluck) =>
      results.map((result) => {
        const resObj = {};
        const pluckKeys = Object.keys(pluck);
        pluckKeys.forEach((key) => {
          resObj[key] = result[pluck[key]];
        });
        return resObj;
      });

    const results = await Promise.all(selectors.map(selector => page.$$eval(selector.query, pageEvalFunc, selector.pluck)));

    await browser.close();

    // lowest length of selector results should be used as limit
    const selectLimit = results.reduce(minimumArrLength, results[0].length);

    const groupedResults = [];

    for (let i = 0; i < selectLimit; i += 1) {
      const combinedSelector = {};
      results.forEach((result) => {
        // get each result at current index
        const resKeys = Object.keys(result[i]);
        resKeys.forEach((key) => {
          combinedSelector[key] = result[i][key];
        });
      });
      combinedSelector.torrentGroupId = groupId;
      combinedSelector.torrentSiteId = siteId;
      combinedSelector.typeId = typeId;
      groupedResults.push(combinedSelector);
    }
    console.log('grouped results length', groupedResults.length);
    return groupedResults.length ? groupedResults : { skip: true };
  } catch (err) {
    console.log('error !');
    console.log({
      typeId,
      groupId,
      siteId,
      groupName,
      groupTag,
      resourceDomain,
      webPage,
      selectors,
    });
    console.log(err);

    RALogger.error('in puppeteer error');
    RALogger.error(err);
    return { skip: true };
  }
};

module.exports = puppet;
