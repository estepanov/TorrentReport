const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');
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
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password;
};

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
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
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
};

const sendActivationEmail = (user) => {
  console.log('----> send email <----');
  // console.log(user);
  // console.log('--> --> ', user.email);
  sendActivationLink('FAKE123TOKEN', user.email).catch((err) => {
    console.error('send activation email error');
    console.error(err);
  });
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.afterCreate(sendActivationEmail);
