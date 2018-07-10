/* eslint-disable global-require import/no-dynamic-require */
const { logger } = require('../../logging');
const nodemailer = require('nodemailer');

let cred;
if (
  !process.env.EMAIL_HOST ||
  !process.env.EMAIL_PORT ||
  !process.env.EMAIL_SEC ||
  !process.env.EMAIL_USER ||
  !process.env.EMAIL_PASS
) {
  throw Error('Missing Email Config Details');
} else {
  cred = {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: process.env.EMAIL_SEC == 'true', // use TLS
    auth: {
      type: 'login',
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  };
}

const transporter = nodemailer.createTransport(cred);

// verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    logger.info('## Email Service Status ## - FAIL!');
    logger.info(`'## Email Service Status ## error: ${error}`);
  } else {
    logger.info('## Email Service Status ## + Running!');
    logger.info(`## Email Service Status ## success: ${success}`);
  }
});

module.exports = transporter;
