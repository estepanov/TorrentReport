const router = require('express').Router();
const { User } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    })
      .then(users => res.json(users))
      .catch(next);
  } else {
    next();
  }
});

router.get('/deleteMyAccount', (req, res, next) => {
  if (req.user) {
    User.destroy({
      where: { id: req.user.id },
    })
      .then(user => res.json('success'))
      .catch(next);
  } else {
    next();
  }
});
