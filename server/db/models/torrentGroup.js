const Sequelize = require('sequelize');
const TorrentSite = require('./torrentSite');
const db = require('../db');

const TorrentGroup = db.define(
  'torrentGroup',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tag: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    scopes: {
      withSite: {
        include: [TorrentSite],
      },
    },
  },
);

module.exports = TorrentGroup;
