/* eslint-disable global-require */
require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const session = require('express-session');
const RateLimit = require('express-rate-limit');

const passport = require('passport');
const helmet = require('helmet');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const redisClient = require('./redis');
const { logger } = require('./logging');

const sessionStore = new SequelizeStore({
  db,
});
const PORT = process.env.PORT || 8080;
const app = express();
const socketio = require('socket.io');

module.exports = app;

const { scraper } = require('./cron');

if (process.env.NODE_ENV !== 'test') {
  scraper.start();
  logger.info('## Scrape Service Status ##', scraper.running ? '+ Running' : '- FAIL!');
}

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */

// passport registration
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  db.models.user
    .findById(id)
    .then(user => done(null, user))
    .catch(done));

const createApp = () => {
  // for proxy in production
  if (app.get('env') === 'production') app.enable('trust proxy');

  // secure headers
  app.use(helmet());

  // logging middleware
  app.use(morgan('combined', {
    stream: logger.stream,
  }));

  // body parsing middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  // compression middleware
  app.use(compression());

  // session middleware with passport
  const sessionValues = {
    cookie: {},
    name: 'sessionId',
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || '2167SQe023713Lhr3KE349ads786asd5s62s9m3ldf3487634',
  };
  // if (app.get('env') === 'production') {
  //   sessionValues.cookie.secure = true;
  // }

  app.use(session(sessionValues));

  // passport auth
  app.use(passport.initialize());
  app.use(passport.session());

  // rate limiter for api
  const limiter = new RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 100 requests per windowMs
    delayMs: 3000, // disable delaying - full speed until the max limit is reached
  });

  // auth and api routes
  app.use('/test', require('./test'));
  app.use('/auth', require('./auth'), limiter);
  app.use('/api', require('./api'), limiter);

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error(`Not found path: ${req.path}`);
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  // error handling endware
  // eslint-disable-next-line
  app.use((err, req, res, next) => {
    logger.error(err);
    logger.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () => {
    logger.info(`## Web Server ## + Running! \t(on port ${PORT}) -> http://localhost:${PORT}/`);
  });

  // set up our socket control center
  const io = socketio(server);
  require('./socket')(io);
};

const redisFlush = () =>
  redisClient.flushdb((err, succeeded) => {
    if (succeeded) logger.info('## Redis Server ## + Flushed!');
    else {
      logger.error('## Redis Server ## - NOT FLUSHED');
      logger.error(err);
    }
  });

const syncDb = () => db.sync();

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  sessionStore
    .sync()
    .then(syncDb)
    .then(redisFlush)
    .then(createApp)
    .then(startListening);
} else {
  createApp();
}
