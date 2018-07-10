const User = require('./user');
const UserAccess = require('./userAccess');
const TorrentSite = require('./torrentSite');
const TorrentInfo = require('./torrentInfo');
const TorrentListing = require('./torrentListing');
const TorrentSnapshot = require('./torrentSnapshot');
const TorrentGroup = require('./torrentGroup');
const TorrentStats = require('./torrentStats');
const TorrentCategory = require('./torrentCategory');
const TorrentUploader = require('./torrentUploader');

TorrentGroup.belongsTo(TorrentSite);
TorrentInfo.belongsToMany(TorrentGroup, {
  as: 'Group',
  through: 'InfoGroup',
});
TorrentGroup.belongsToMany(TorrentInfo, {
  as: 'Group',
  through: 'InfoGroup',
});

TorrentListing.belongsToMany(TorrentInfo, {
  as: 'Infos',
  through: 'ListingInfo',
});
TorrentInfo.belongsTo(TorrentListing);

TorrentInfo.belongsToMany(TorrentCategory, {
  as: 'Category',
  through: 'InfoCategory',
});
TorrentCategory.belongsToMany(TorrentInfo, {
  as: 'Category',
  through: 'InfoCategory',
});

TorrentInfo.belongsTo(TorrentUploader);
TorrentUploader.hasMany(TorrentInfo);

TorrentUploader.belongsToMany(TorrentSite, { through: 'SiteUploader' });
TorrentSite.belongsToMany(TorrentUploader, { through: 'SiteUploader' });

TorrentInfo.hasMany(TorrentSnapshot);
TorrentSnapshot.belongsTo(TorrentInfo);
TorrentSnapshot.belongsTo(TorrentStats);

UserAccess.belongsTo(User);

module.exports = {
  User,
  UserAccess,
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
  TorrentStats,
  TorrentUploader,
  TorrentCategory,
};
