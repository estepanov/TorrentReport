const router = require('express').Router();
const { TorrentStats } = require('../../db/models');
const redis = require('../../redis');

module.exports = router;

const maxIdDetail = () =>
  TorrentStats.max('id')
    .then(maxId => TorrentStats.findById(maxId))
    .then((maxStatObj) => {
      if (maxStatObj.active) return TorrentStats.findById(parseInt(maxStatObj.id, 10) - 1);
      return Promise.resolve(maxStatObj);
    });

router.get('/', (req, res, next) => {
  redis.get('api/stats/', (error, result) => {
    if (result) return res.json(JSON.parse(result));
    maxIdDetail()
      .then(async (statObj) => {
        const newStatObj = statObj.toJSON();
        newStatObj.fetched = new Date();
        return newStatObj;
      })
      .then((data) => {
        redis.setex('api/stats/', 300, JSON.stringify(data));
        return res.json(data);
      })
      .catch(next);
  });
});

router.get('/active', (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    TorrentStats.findOne({ where: { active: true } })
      .then(data => res.json(data))
      .catch(next);
  } else {
    next();
  }
});
