const Sequelize = require('sequelize')
const db = require('../db')

const TorrentGroup = db.define('torrentGroup', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  short: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = TorrentGroup
