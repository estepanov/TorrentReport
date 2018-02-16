const router = require('express').Router();
const {
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
} = require('../../db/models');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

module.exports = router;

router.get('/:id', (req, res, next) => {
  // if (req.user && req.user.isAdmin) {
  TorrentInfo.findById(parseInt(req.params.id, 10), {
    include: [
      { model: TorrentListing },
      { as: 'Group', through: 'InfoGroup', model: TorrentGroup },
    ],
  })
    .then(data => res.json(data))
    .catch(next);
  // } else {
  //   next()
  // }
});

router.post('/', (req, res, next) => {
  // if (req.user && req.user.isAdmin) {
  console.log('-->', req.body);
  // if (!req.body.infoIds || !req.body.infoIds.length > 0) return res.sendStatus(401);
  if (!req.body.infoIds || !req.body.infoIds.length > 0) return res.sendStatus(404);
  const id = req.body.infoIds.map(item => parseInt(item, 10));

  TorrentInfo.findAll(
    { where: { id } },
    {
      include: [
        { model: TorrentListing },
        { as: 'Group', through: 'InfoGroup', model: TorrentGroup },
      ],
    },
  )
    .then(data => res.json(data))
    .catch(next);
  // } else {
  //   next()
  // }
});

router.get('/new/top/:days/:order', (req, res, next) => {
  if (!req.params.days) req.params.days = 1;
  if (!req.params.order || !['seed', 'leach'].includes(req.params.order)) req.params.order = 'seed';
  const days = parseInt(req.params.days, 10);
  if (days > 31) res.sendStatus(403);
  const filterTime = new Date() - days * 24 * 60 * 60 * 1000;
  TorrentInfo.findAll({
    where: {
      createdAt: {
        [Op.gte]: new Date(filterTime),
      },
    },
    limit: 100,
    order: [[req.params.order, 'DESC']],
    include: ['Group'],
  })
    .then(data => res.json(data))
    .catch(next);
});

router.get('/new/:days', (req, res, next) => {
  if (!req.params.days) req.params.days = 1;
  const days = parseInt(req.params.days, 10);
  if (days > 31) res.sendStatus(403);
  const filterTime = new Date() - days * 24 * 60 * 60 * 1000;
  TorrentInfo.findAll({
    where: {
      createdAt: {
        [Op.gte]: new Date(filterTime),
      },
    },
    include: ['Group'],
  })
    .then(data => res.json(data))
    .catch(next);
});