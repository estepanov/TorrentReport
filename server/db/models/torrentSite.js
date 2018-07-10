const Sequelize = require('sequelize');
const db = require('../db');

const TorrentSite = db.define('torrentSite', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  short: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = TorrentSite;
