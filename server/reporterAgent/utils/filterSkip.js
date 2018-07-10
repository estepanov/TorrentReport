/**
 * Removes items from array that have an object
 * {skip:true}.
 * @param {Array} arrOfStuff Array to clean
 */
const filterSkips = arrOfStuff => Array.from(arrOfStuff).filter(group => !group.skip);

module.exports = filterSkips;
