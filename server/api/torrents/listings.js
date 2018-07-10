const router = require('express').Router();
const Sequelize = require('sequelize');

const {
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
} = require('../../db/models');
const redis = require('../../redis');

const Op = Sequelize.Op;

module.exports = router;

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  redis.get(`api/listings/${id}`, (error, result) => {
    if (result) return res.send(JSON.parse(result));
    TorrentListing.scope('withSites')
      .findById(id)
      .then((data) => {
        redis.setex(`api/listings/${id}`, 180, JSON.stringify(data));
        return res.json(data);
      })
      .catch(next);
  });
});

router.post('/', (req, res, next) => {
  if (!req.body.listingIds || !req.body.listingIds.length > 0) return res.sendStatus(404);
  const id = req.body.listingIds.map(item => parseInt(item, 10));
  TorrentListing.scope('withSites')
    .findAll({ where: { id } })
    .then(data => res.json(data))
    .catch(next);
});

router.get('/new/:days', (req, res, next) => {
  const input = parseInt(req.params.days, 10);
  if (!input || !Number.isInteger(input)) return res.sendStatus(404);
  if (input > 31) return res.sendStatus(403);

  redis.get(`api/listings/new/${input}`, (error, result) => {
    if (result) return res.json(JSON.parse(result));
    const filterTime = new Date() - input * 24 * 60 * 60 * 1000;
    TorrentListing.scope('withSites')
      .findAll({
        where: {
          createdAt: {
            [Op.gte]: new Date(filterTime),
          },
        },
        order: [['createdAt', 'DESC']],
      })
      .then((data) => {
        redis.setex(`api/listings/new/${input}`, 43200, JSON.stringify(data));
        return res.json(data);
      })
      .catch(next);
  });
});
