const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');
const userAccess = require('./userAccess');

const { sendActivationLink } = require('../../notifier/email/emails');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  password: {
    type: Sequelize.STRING,
  },
  activated: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  salt: {
    type: Sequelize.STRING,
  },
  googleId: {
    type: Sequelize.STRING,
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function correctPassword(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password;
};

/**
 * classMethods
 */
User.generateSalt = function generateSalt() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function encryptPassword(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

/**
 * hooks
 */
const setSaltAndPassword = (user) => {
  if (user.changed('password')) {
    user.salt = User.generateSalt(); // eslint-disable-line
    user.password = User.encryptPassword(user.password, user.salt); // eslint-disable-line
  }
};

const createAuthToken = (user) => {
  if (!user.actived && user.password) {
    userAccess
      .create({
        userId: user.id,
        action: 'activate_account',
      })
      .then(accessObj => sendActivationLink(accessObj.token, user.email))
      .catch((err) => {
        console.error('error creating user access');
        console.error(err);
      });
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.afterCreate(createAuthToken);
