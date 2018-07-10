const router = require('express').Router();
const {
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
} = require('../../db/models');
const redis = require('../../redis');

module.exports = router;

router.get('/', (req, res, next) => {
  // if (req.user && req.user.isAdmin) {
  redis.get('api/sites/', (error, result) => {
    if (result) return res.json(JSON.parse(result));
    return TorrentSite.findAll()
      .then((data) => {
        redis.setex('api/sites/', 1200, JSON.stringify(data));
        return res.json(data);
      })
      .catch(next);
  });

  // } else {
  //   next()
  // }
});
