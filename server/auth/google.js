const { logger } = require('../logging');
const passport = require('passport');
const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../db/models');

const fs = require('fs');
const path = require('path');

module.exports = router;

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

const SECRETS_PATH = path.resolve(__dirname, '../../secrets.js');
let googleConfig;
if (!process.env.GOOGLE_CLIENT_ID && !fs.existsSync(SECRETS_PATH)) {
  logger.info('## OAuth - Google ## - FAIL! \t (Google client ID / secret not found. Skipping Google OAuth.)');
} else {
  if (fs.existsSync(SECRETS_PATH)) {
    logger.info('## OAuth - Google ## - SUCCESS! \t (SECRETS VAR)');
    googleConfig = require(SECRETS_PATH).google; // eslint-disable-line
  } else {
    logger.info('## OAuth - Google ## - SUCCESS! \t (ENV VAR)');
    googleConfig = {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    };
  }

  const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;

    User.find({ where: { googleId } })
      .then(foundUser =>
        (foundUser
          ? done(null, foundUser)
          : User.create({
            name,
            email,
            googleId,
            activated: true,
          }).then(createdUser => done(null, createdUser))))
      .catch(done);
  });

  passport.use(strategy);

  router.get(
    '/',
    passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.email' }),
  );

  router.get(
    '/callback',
    passport.authenticate('google', {
      successRedirect: '/account',
      failureRedirect: '/login',
    }),
  );
}
