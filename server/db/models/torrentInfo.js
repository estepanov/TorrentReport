const Sequelize = require('sequelize');
const { TorrentSite, TorrentListing, TorrentGroup } = require('./index');
const db = require('../db');

const TorrentInfo = db.define('torrentInfo', {
  uploadDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  seed: {
    type: Sequelize.INTEGER,
  },
  leach: {
    type: Sequelize.INTEGER,
  },
  uploadUser: {
    type: Sequelize.STRING,
  },
  size: {
    type: Sequelize.STRING,
  },
  hash: {
    type: Sequelize.STRING,
  },
  url: {
    type: Sequelize.STRING,
  },
});

module.exports = TorrentInfo;
