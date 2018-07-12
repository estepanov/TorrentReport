const ThePirateBay = require('./tpb');
const RARBG = require('./rarbg');
const leet1337x = require('./1337x');
const yts = require('./yts');
const limeTorrents = require('./limeTorrents');
const eztv = require('./eztv');
const torlock = require('./torlock');

const sitesArray = [];
sitesArray.push(ThePirateBay);
sitesArray.push(RARBG);
sitesArray.push(leet1337x);
sitesArray.push(yts);
sitesArray.push(limeTorrents);
sitesArray.push(eztv);
sitesArray.push(torlock);

module.exports = sitesArray;
