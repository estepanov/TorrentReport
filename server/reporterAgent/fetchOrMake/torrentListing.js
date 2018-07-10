const { RALogger } = require('../../logging');
const {
  TorrentInfo,
  TorrentListing,
  TorrentGroup,
  TorrentCategory,
  TorrentUploader,
} = require('../../db/models');

const safeFields = {
  fields: [
    'torrentCategoryId',
    'torrentUploaderId',
    'imdb',
    'seed',
    'minSeed',
    'minSeedDate',
    'maxSeed',
    'maxSeedDate',
    'leech',
    'minLeech',
    'minLeechDate',
    'maxLeech',
    'maxLeechDate',
    'ratio',
    'minRatio',
    'minRatioDate',
    'maxRatio',
    'maxRatioDate',
    'hash',
    'uploadDate',
    'uploadUser',
    'size',
    'category',
    'url',
    'torrentListingId',
  ],
};

const getOrMakeTorrentListing = (torrentScrapeObj) => {
  const newTorrentObj = Object.assign({}, torrentScrapeObj);
  let dbListingObj;
  RALogger.verbose(`site id: ${torrentScrapeObj.torrentSiteId}  | group id: ${
    torrentScrapeObj.torrentGroupId
  }  | type id: ${torrentScrapeObj.typeId}  | torrent listing name: ${torrentScrapeObj.name}`);
  return TorrentListing.findOrCreate({
    where: {
      name: torrentScrapeObj.name,
    },
  })
    .spread((listing, created) => {
      RALogger.verbose(`... was created? ${created}`);
      newTorrentObj.torrentListingId = listing.id;
      dbListingObj = listing;
      return listing.getInfos({
        include: [
          { as: 'Group', model: TorrentGroup },
          { model: TorrentUploader },
          { as: 'Category', through: 'InfoCategory', model: TorrentCategory },
        ],
      });
    })
    .then((infos) => {
      let foundGroupInfo = false;
      let foundInfo = false;
      let foundCategory = false;
      infos.forEach((info) => {
        // check if current torrent uplaod user is already in our db.
        if (
          typeof torrentScrapeObj.uploadUser !== 'undefined' &&
          torrentScrapeObj.uploadUser !== null &&
          torrentScrapeObj.uploadUser !== '' &&
          typeof info.uploadUser !== 'undefined' &&
          info.uploadUser !== null &&
          info.uploadUser !== '' &&
          info.uploadUser.toLowerCase() === torrentScrapeObj.uploadUser.toLowerCase()
        ) {
          foundInfo = info;
          RALogger.verbose('... did find curr uploaduser in info!!!!');
          RALogger.verbose(`... info uploaduser ${info.uploadUser} obj uplaoduser ${torrentScrapeObj.uploadUser}`);
          newTorrentObj.torrentInfoId = parseInt(info.id, 10);
        }

        // check if group already found
        info.Group.forEach((group) => {
          if (parseInt(group.id, 10) === parseInt(torrentScrapeObj.torrentGroupId, 10)) {
            foundGroupInfo = info;
            RALogger.verbose(`... group already exists in existing info  ${foundGroupInfo}`);
            RALogger.verbose(`... info group id ${group.id} obj group id ${torrentScrapeObj.torrentGroupId} `);
          }
        });
        RALogger.verbose(`info cate ${info.Category}`);
        // check if category is linked to info
        if (Array.isArray(info.Category)) {
          info.Category.forEach((category) => {
            if (parseInt(category.id, 10) === parseInt(torrentScrapeObj.typeId, 10)) {
              RALogger.verbose('... found category linked to info already');
              foundCategory = info;
            }
          });
        }
      });

      const rawRatio = newTorrentObj.leech === 0 ? 0 : newTorrentObj.seed / newTorrentObj.leech;
      newTorrentObj.ratio = Math.floor(rawRatio * 100) / 100;

      // newTorrentObj needs max and min setup
      // compare new min and max to existing
      const nowDateObj = new Date();
      if (foundInfo) {
        if (newTorrentObj.seed > foundInfo.maxSeed) {
          newTorrentObj.maxSeed = newTorrentObj.seed;
          newTorrentObj.maxSeedDate = nowDateObj;
        }
        if (newTorrentObj.seed < foundInfo.minSeed) {
          newTorrentObj.minSeed = newTorrentObj.seed;
          newTorrentObj.minSeedDate = nowDateObj;
        }
        if (newTorrentObj.leech > foundInfo.maxLeech) {
          newTorrentObj.maxLeech = newTorrentObj.leech;
          newTorrentObj.maxLeechDate = nowDateObj;
        }
        if (newTorrentObj.leech < foundInfo.minLeech) {
          newTorrentObj.minLeech = newTorrentObj.leech;
          newTorrentObj.minLeechDate = nowDateObj;
        }
        if (newTorrentObj.ratio < foundInfo.minRatio) {
          newTorrentObj.minRatio = newTorrentObj.ratio;
          newTorrentObj.minRatioDate = nowDateObj;
        }
        if (newTorrentObj.ratio > foundInfo.minRatio) {
          newTorrentObj.maxRatio = newTorrentObj.ratio;
          newTorrentObj.maxRatioDate = nowDateObj;
        }
      } else {
        // its a newly found torrent init the max and min
        newTorrentObj.maxSeed = newTorrentObj.seed;
        newTorrentObj.maxSeedDate = nowDateObj;
        newTorrentObj.maxLeech = newTorrentObj.leech;
        newTorrentObj.maxLeechDate = nowDateObj;
        newTorrentObj.minSeed = newTorrentObj.seed;
        newTorrentObj.minSeedDate = nowDateObj;
        newTorrentObj.minLeech = newTorrentObj.leech;
        newTorrentObj.minLeechDate = nowDateObj;
        newTorrentObj.minRatio = newTorrentObj.ratio;
        newTorrentObj.minRatioDate = nowDateObj;
        newTorrentObj.maxRatio = newTorrentObj.ratio;
        newTorrentObj.maxRatioDate = nowDateObj;
      }

      if (!foundGroupInfo && foundInfo) {
        RALogger.verbose('... DID NOT FIND GROUP BUT FOUND INFO, update info add group');
        return foundInfo
          .updateAttributes(newTorrentObj)
          .then(updatedObj => updatedObj.addGroup(torrentScrapeObj.torrentGroupId))
          .then((updatedObj) => {
            RALogger.verbose('... inside of did not find group after addgroup updatedObj ->');
            if (!foundCategory) return foundInfo.addCategory(torrentScrapeObj.typeId);
            return updatedObj;
          });
      }
      if (foundGroupInfo && foundInfo) {
        RALogger.verbose('.. FOUND GROUP AND INFO, just update');
        return foundInfo.updateAttributes(newTorrentObj).then((updatedObj) => {
          if (!foundCategory) return updatedObj.addCategory(torrentScrapeObj.typeId);
          return updatedObj;
        });
      }

      // true Group true Info,
      RALogger.verbose('... creating info');
      return TorrentInfo.create(newTorrentObj, safeFields).then((createdInfo) => {
        createdInfo.addGroup(torrentScrapeObj.torrentGroupId);
        createdInfo.addCategory(torrentScrapeObj.typeId);
        newTorrentObj.torrentInfoId = createdInfo.id;
        RALogger.verbose('... created info item and association ');
        return dbListingObj.addInfo(createdInfo);
      });
    })
    .then(_ => newTorrentObj);
};

module.exports = getOrMakeTorrentListing;
