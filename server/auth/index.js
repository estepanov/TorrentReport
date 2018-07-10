const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const router = require('express').Router();
const User = require('../db/models/user');
const _ = require('lodash');

module.exports = router;

const cleanUser = userObj => _.pick(userObj, ['email', 'id']);

const { window } = new JSDOM('');
const DOMPurify = createDOMPurify(window);

router.post('/login', (req, res, next) => {
  // sanitize data
  const sanitizedBody = {
    email: DOMPurify.sanitize(req.body.email),
    password: req.body.password,
  };

  User.findOne({ where: { email: sanitizedBody.email } })
    .then((user) => {
      if (!user) {
        res.status(401).send('User not found');
      } else if (!user.correctPassword(sanitizedBody.password)) {
        res.status(401).send('Incorrect password');
      } else if (!user.activated) {
        res.send('Need to activate account.');
      } else {
        req.login(user, err => (err ? next(err) : res.json(cleanUser(user))));
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  const sanitizedBody = {
    email: DOMPurify.sanitize(req.body.email),
    password: req.body.password,
  };
  // user registration
  User.create(sanitizedBody)
    .then((user) => {
      const objectToSend = cleanUser(user);
      // res.send(objectToSend);
      req.login(user, err => (err ? next(err) : res.json(cleanUser(user))));
    })
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists');
      } else {
        next(err);
      }
    });
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(cleanUser(req.user));
});

router.use('/google', require('./google'));

router.use('/access', require('./access'));
