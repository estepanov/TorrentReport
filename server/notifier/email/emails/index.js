const { logger } = require('../../../logging');
const transporter = require('../index');
const { errorMessage } = require('./error');
const activateMessage = require('./activateAccount');

const logEmail = (data) => {
  logger.info('--- email sent ---', data);
};

const sendError = (title, message) => {
  const messageObj = errorMessage({ title, message, receiver: process.env.ADMIN_EMAIL });
  return transporter.sendMail(messageObj).then(logEmail);
};

const sendActivationLink = (token, email) => {
  const messageObj = activateMessage(token, email);
  if (process.env.NODE_ENV === 'test') return console.log('test envr: email not sent');
  return transporter.sendMail(messageObj);
};

// const sendMessage = messageFunc => (title, message) => {
//   const messageObj = messageFunc(title, message);
// };

module.exports = { sendError, sendActivationLink };
