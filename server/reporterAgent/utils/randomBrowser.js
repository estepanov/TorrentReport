const randomNumber = require('./randomNumber');

const browserResolutions = [
  {
    width: 1920,
    height: 1080,
  },
  {
    width: 1136,
    height: 640,
  },
  {
    width: 1334,
    height: 750,
  },
  {
    width: 1280,
    height: 800,
  },
  {
    width: 1366,
    height: 768,
  },
  {
    width: 1440,
    height: 900,
  },
  {
    width: 1400,
    height: 1050,
  },
  {
    width: 1920,
    height: 1200,
  },
];

/**
 * Returns a random screen resolution object
 * containing {width, height}.
 */
const randomResolution = () => {
  const max = browserResolutions.length - 1;
  return browserResolutions[randomNumber(0, max)];
};

const browserAgents = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0',
  'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
  'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36',
];

/**
 * Returns a random user agent string.
 */
const randomAgent = () => {
  const max = browserAgents.length - 1;
  return browserAgents[randomNumber(0, max)];
};

module.exports = { randomResolution, randomAgent };
