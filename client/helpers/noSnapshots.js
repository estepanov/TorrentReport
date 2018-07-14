const noSnapshots = info =>
  info &&
  info.leech === 0 &&
  info.maxLeech === 0 &&
  info.minLeech === 0 &&
  info.seed === 0 &&
  info.maxSeed === 0 &&
  info.minSeed === 0;

export default noSnapshots;
