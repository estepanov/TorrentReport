const {
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
  TorrentStats,
} = require('../../db/models');
/**
 * Returns count of sites in DB.
 */
const getSiteCount = () => TorrentSite.count();
/**
 * Returns count of scrapes in DB.
 */
const getScrapeCount = () => TorrentStats.count();
/**
 * Returns count of infos in DB.
 */
const getInfoCount = () => TorrentInfo.count();
/**
 * Returns count of groups in DB.
 */
const getGroupCount = () => TorrentGroup.count();
/**
 * Returns count of snapshots in DB.
 */
const getSnapshotCount = () => TorrentSnapshot.count();
/**
 * Returns count of torrentListings in DB.
 */
const getTorrentCount = () => TorrentListing.count();

module.exports = {
  getSiteCount,
  getScrapeCount,
  getInfoCount,
  getGroupCount,
  getSnapshotCount,
  getTorrentCount,
};
