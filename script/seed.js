/* eslint-disable */

const db = require('../server/db');
const {
  User,
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
  TorrentStats,
} = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({ email: 'admin@email.com', password: '123' }),
    User.create({ email: 'user@email.com', password: '123' }),
  ]);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const torrentStats = await Promise.all([
    TorrentStats.create({
      siteCount: 0,
      siteLoadCount: 0,
      scrapeCount: 0,
      torrentCount: 0,
      torrentLoadCount: 0,
      groupCount: 0,
      groupLoadCount: 0,
      listingCount: 0,
      infoCount: 0,
      snapshotCount: 0,
      active: false,
      endedAt: yesterday,
      createdAt: yesterday,
      updatedAt: yesterday,
    }),
  ]);

  // const torrentSites = await Promise.all([
  //   TorrentSite.create({
  //     name: 'The Pirate Bay',
  //     short: 'TPB',
  //     url: 'https://thepiratebay.org/',
  //   }),
  //   TorrentSite.create({
  //     name: 'RARBG',
  //     short: 'RARBG',
  //     url: 'https://rarbg.to',
  //   }),
  // ]);

  // const torrentGroup = await Promise.all([
  //   TorrentGroup.create({
  //     torrentSiteId: 1,
  //     name: 'TOP100MOVIES',
  //     tag: 'top100Movies',
  //     url: 'https://thepiratebay.org/top/200',
  //   }),
  //   TorrentGroup.create({
  //     torrentSiteId: 2,
  //     name: 'TOP100MOVIES',
  //     tag: 'top100Movies',
  //     url:
  //       'https://rarbg.to/top100.php?category%5B%5D=14&category%5B%5D=48&category%5B%5D=17&category%5B%5D=44&category%5B%5D=45&category%5B%5D=47&category%5B%5D=50&category%5B%5D=51&category%5B%5D=52&category%5B%5D=42&category%5B%5D=46&category%5B%5D=49',
  //   }),
  // ]);

  // const torrentListing = await Promise.all([
  //   TorrentListing.create({
  //     name: 'Fake Movie 2017 1080p',
  //   }),
  //   TorrentListing.create({
  //     name: 'NOT ANOTHER Fake Movie 2017 1080p',
  //   }),
  //   TorrentListing.create({
  //     name: 'Drop it likes its Hot 2001 1080p',
  //   }),
  // ]);

  // const torrentInfo = await Promise.all([
  //   TorrentInfo.create({
  //     torrentListingId: 1,
  //     uploadDate: new Date(),
  //     uploadUser: 'upLOADERuserTPB',
  //     size: '2.4 GB',
  //     hash: '111233321123',
  //     url: 'https://tpb.site',
  //   }),
  //   TorrentInfo.create({
  //     torrentListingId: 1,
  //     uploadDate: new Date(),
  //     uploadUser: 'upLOADERuserNOTfromTPB',
  //     size: '5.2 GB',
  //     hash: '111233321123',
  //     url: 'https://rarbg.site',
  //   }),
  // ]);

  // const InfoGroups = await Promise.all([
  //   TorrentInfo.findById(1).then(listing => listing.addGroup(1)),
  //   TorrentInfo.findById(2).then(listing => listing.addGroup(2)),
  // ]);

  // const ListingsInfo = await Promise.all([
  //   TorrentListing.findOrCreate({ where: { name: 'Fake Movie 2017 1080p' } }).spread(async (listing, created) => {
  //     await listing.addInfos(1);
  //     await listing.addInfos(2);
  //   }),
  // ]);

  // const torrentSnapshot = await Promise.all([
  //   TorrentSnapshot.create({
  //     torrentInfoId: 1,
  //     seed: 420,
  //     date: new Date() - 1,
  //     leech: 421,
  //   }),
  //   TorrentSnapshot.create({
  //     torrentInfoId: 1,
  //     date: new Date() - 2,
  //     seed: 420,
  //     leech: 421,
  //   }),
  // ]);

  console.log('-------- seeded successfully --------');
  console.log(` + ${users.length} users`);
  // console.log(` + ${torrentSites.length} torrent sites`);
  // console.log(` + ${torrentInfo.length} torrent infos`);
  // console.log(` + ${torrentListing.length} torrent listings`);
  // console.log(` + ${torrentSnapshot.length} torrent snapshots`);
  // console.log(` + ${torrentGroup.length} torrent groups`);
  console.log('-------------------------------------');
}

seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

console.log('seeding...');
