const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return Math.round(bytes / (1024 ** i), 2) + sizes[i];
};

const seedOrLeachFix = (rawResult) => {
  if (typeof rawResult === 'string') {
    const clean = rawResult.replace(',', '');
    return parseInt(clean, 10);
  }
  return parseInt(rawResult, 10);
};

const universalClean = (key, rawResult) => {
  let returnValue;
  switch (key) {
    case 'name': {
      returnValue = rawResult.replace(/\./g, ' ').trim();
      break;
    }
    case 'seed': {
      returnValue = seedOrLeachFix(rawResult);
      break;
    }
    case 'leech': {
      returnValue = seedOrLeachFix(rawResult);
      break;
    }
    default: {
      returnValue = rawResult;
      break;
    }
  }
  return returnValue;
};

module.exports = { universalClean, bytesToSize };
