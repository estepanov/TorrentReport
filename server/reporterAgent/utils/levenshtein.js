const records = {};
torrents.forEach((torrent) => {
  const name = torrent.torrentInfo.torrentListing.name;
  if (name === '') return;
  let idx = 0;
  // find cut off idx
  while (
    name[idx].search(/[^a-zA-Z:\-\s]+/) === -1 ||
    (name[idx + 1] && name[idx + 1].search(/[^a-zA-Z:\-\s]+/) === -1)
  ) {
    idx += 1;
  }
  // backtrack for 'S0E2' and spaces at end
  while (name[idx - 1] === 'S' || name[idx - 1] === ' ') {
    idx -= 1;
    console.log({ name });
  }

  const shortName = name.slice(0, idx);
  if (records[shortName]) {
    records[shortName]++;
  } else {
    records[shortName] = 1;
  }
});
