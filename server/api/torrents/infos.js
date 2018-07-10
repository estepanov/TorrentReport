const router = require('express').Router();

const Sequelize = require('sequelize');
const {
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
  TorrentCategory,
} = require('../../db/models');
const redis = require('../../redis');

const { Op } = Sequelize;

module.exports = router;

router.get('/:id', (req, res, next) => {
  // if (req.user && req.user.isAdmin) {
  const id = parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) return res.sendStatus(404);
  redis.get(`api/infos/${id}`, (error, result) => {
    if (result) return res.json(JSON.parse(result));
    return TorrentInfo.findById(id, {
      include: [
        { model: TorrentListing },
        { as: 'Category', model: TorrentCategory },
        { model: TorrentSnapshot },
        {
          as: 'Group',
          through: 'InfoGroup',
          model: TorrentGroup,
          include: [TorrentSite],
        },
      ],
    })
      .then((data) => {
        redis.setex(`api/infos/${id}`, 180, JSON.stringify(data));
        return res.json(data);
      })
      .catch(next);
  });
  // } else {
  //   next()
  // }
});

router.post('/', (req, res, next) => {
  if (!req.body.infoIds || !req.body.infoIds.length > 0) return res.sendStatus(404);
  const id = req.body.infoIds.map(item => parseInt(item, 10));

  return TorrentInfo.findAll({
    where: { id },
    include: [
      { model: TorrentListing },
      { as: 'Category', model: TorrentCategory },
      { model: TorrentSnapshot },
      {
        as: 'Group',
        through: 'InfoGroup',
        model: TorrentGroup,
        include: [TorrentSite],
      },
    ],
  })
    .then(data => res.json(data))
    .catch(next);
});

router.get('/new/top/:days/:order', (req, res, next) => {
  if (!req.params.days) req.params.days = 1;
  if (!req.params.order || !['seed', 'leech'].includes(req.params.order)) req.params.order = 'seed';
  const days = parseInt(req.params.days, 10);
  if (days > 31) return res.sendStatus(403);
  const d = days * 24 * 60 * 60 * 1000;
  const filterTime = new Date() - d;
  return TorrentInfo.findAll({
    where: {
      createdAt: {
        [Op.gte]: new Date(filterTime),
      },
    },
    order: [[req.params.order, 'DESC']],
    include: ['Group', { as: 'Category', model: TorrentCategory }],
  })
    .then(data => res.json(data))
    .catch(next);
});

router.get('/new/:days', (req, res, next) => {
  if (!req.params.days) req.params.days = 1;
  const days = parseInt(req.params.days, 10);
  if (days > 31) return res.sendStatus(403);
  const d = days * 24 * 60 * 60 * 1000;
  const filterTime = new Date() - d;
  return TorrentInfo.findAll({
    where: {
      createdAt: {
        [Op.gte]: new Date(filterTime),
      },
    },
    include: ['Group', TorrentSnapshot, { as: 'Category', model: TorrentCategory }],
  })
    .then(data => res.json(data))
    .catch(next);
});

router.get('/new/group/:groupId/:daysUpdated', (req, res, next) => {
  // if (req.user && req.user.isAdmin) {
  const { groupId, daysUpdated } = req.params;
  const id = parseInt(groupId, 10);
  const days = parseInt(daysUpdated, 10);
  if (days > 31 || !Number.isInteger(days)) return res.sendStatus(404);
  const d = days * 24 * 60 * 60 * 1000;
  const filterTime = new Date() - d;
  return TorrentInfo.findAll({
    where: {
      createdAt: {
        [Op.gte]: new Date(filterTime),
      },
    },
    include: [
      { as: 'Group', model: TorrentGroup, where: { id } },
      { as: 'Category', model: TorrentCategory },
      { model: TorrentSnapshot },
    ],
  })
    .then(data => res.json(data))
    .catch(next);
});
