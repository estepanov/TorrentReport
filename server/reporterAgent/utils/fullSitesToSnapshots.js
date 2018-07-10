const { RALogger } = require('../../logging');
const filterSkip = require('./filterSkip');
const _ = require('lodash');

/**
 * Will remove duplicate snapshots of torrentInfo ids.
 * @param {Array} snapshotArr Array of snapshots
 */
const removeDuplicates = (snapshotArr) => {
  RALogger.verbose('---- removeDuplicates');
  const lookUpObj = {};
  const newSnapshotArr = [];
  snapshotArr.forEach((snapshot) => {
    if (!lookUpObj[snapshot.torrentInfoId]) {
      // first time seeing this snapshot, lets add it.
      newSnapshotArr.push(snapshot);
      lookUpObj[snapshot.torrentInfoId] = true;
    } else {
      RALogger.verbose(`duplicate snapshot found for infoId: ${snapshot.torrentInfoId}`);
    }
  });
  RALogger.verbose('---- removeDuplicates  +complete');
  return newSnapshotArr;
};

/**
 * Pulls the snapshots from full sites array.
 * @param {Array} fullSitesArr The array of result full site object.
 * @param {Integer} statId The statistic id to attach to each snapshot.
 */
const fullSitesToSnapshots = (fullSitesArr, statId) => {
  const cleanSitesArr = filterSkip(fullSitesArr);
  RALogger.verbose('---- fullSitesToSnapshots');
  let itemArr = [];
  cleanSitesArr.forEach((site, id) => {
    RALogger.verbose(`${id} - ${site.siteName} - ${site.groups.length} group(s)`);
    site.groups.forEach((group, gId) => {
      RALogger.verbose(`\t - (${gId}) ${group.groupName} - ${group.groupTag} - ${group.results.length} item(s)`);
      itemArr = itemArr.concat(group.results);
    });
  });

  const cleanItemsArr = removeDuplicates(itemArr);

  const keysToKeepArr = ['torrentInfoId', 'seed', 'leech', 'torrentStatId'];
  const cleanSnapshotArr = cleanItemsArr.map((snapshot) => {
    const newObj = _.pick(snapshot, keysToKeepArr);
    newObj.date = new Date();
    newObj.torrentStatId = statId;
    return newObj;
  });
  RALogger.verbose('---- fullSitesToSnapshots  +complete');
  return cleanSnapshotArr;
};

module.exports = fullSitesToSnapshots;
