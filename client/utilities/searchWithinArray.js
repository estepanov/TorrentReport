import _ from 'lodash';

const searchWithinArray = (arr, target) =>
  new Promise((resolve, reject) => {
    try {
      const cleanTarget = target ? target.trim().toLowerCase() : '';
      if (!cleanTarget) {
        return arr;
      }
      const results = arr.filter(item => _.includes(item.name.toLowerCase(), cleanTarget));
      return resolve(results);
    } catch (err) {
      reject(err);
    }
    return false;
  });

export default searchWithinArray;
