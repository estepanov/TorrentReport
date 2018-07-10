/* eslint-disable no-await-in-loop no-param-reassign */

const { RALogger } = require('../../logging');
const TorrentSite = require('../../db/models/torrentSite');
const TorrentGroup = require('../../db/models/torrentGroup');
const TorrentCategory = require('../../db/models/torrentCategory');

/** @description Returns nested site array (with nested group info).
 * Also creates entities that did not previously exist/their relationships.
 * @param {object} SiteObject Object with site and group details.
 * @returns {object} (Promise) Site object with group details along with their existing or new IDs.
 * */
const getOrMakeNestedSite = siteObj =>
  TorrentSite.findOrCreate({
    where: {
      name: siteObj.siteName,
      short: siteObj.siteShortName,
      url: siteObj.siteUrl,
    },
  })
    .spread((site, created) => {
      RALogger.log('verbose', `${site.name} - was created? ${created}`);
      siteObj.siteId = site.id;
      siteObj.groups.map((group) => {
        group.siteId = site.id;
        return group;
      });
      return siteObj;
    })
    .then(async (site) => {
      RALogger.log('verbose', `${site.siteName} - creating or finding groups...`);
      const newGroups = await Promise.all(site.groups.map((group) => {
        const groupHolder = group;
        return TorrentGroup.findOrCreate({
          where: {
            url: group.webPage,
            name: group.groupName,
            tag: group.groupTag,
            torrentSiteId: site.siteId,
          },
        }).spread(async (groupObj, created) => {
          RALogger.log(
            'verbose',
            `${site.siteName} - group: ${groupObj.name} - was created? ${created}`,
          );
          groupHolder.groupId = groupObj.id;
          return groupHolder;
        });
      }));

      for (let i = 0; i < newGroups.length; i++) {
        const currItem = Object.assign({}, newGroups[i]);
        console.log('===============', currItem);
        const id = await TorrentCategory.findOrCreate({
          where: {
            name: currItem.type,
          },
        }).spread((categoryObj, created) => {
          RALogger.log(
            'verbose',
            `${site.siteName} - category: ${categoryObj.name} - was created? ${created}`,
          );
          return categoryObj.id;
        });
        currItem.typeId = id;
        newGroups[i] = currItem;
      }
      RALogger.log('verbose', `${site.siteName} - - assigning new group arr with above info...`);
      site.groups = newGroups;
      return site;
    })
    .catch((err) => {
      console.log(err);
      RALogger.error('error in siteGroupCategory.js');
      RALogger.error(err);
      return { skip: true };
    });

module.exports = getOrMakeNestedSite;
