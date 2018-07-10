const delay = require('./delay');

/**
 * Returns an array of delayed functions.
 * Each value of dataArray will be bound to the funcToCall function
 * and encapsulated inside delayed call function.
 * @param {Array} dataArray array of values
 * @param {Function} funcToCall that will be called on each arrayValue individually.
 * @param {Integer} delayTime Delay in MS to wait before invoking each function.
 */
const factoryFuncArr = (dataArray, funcToCall, delayTime = 0) =>
  // eslint-disable-next-line
  dataArray.map(item => () => delay(funcToCall, item, delayTime));

/**
 * Takes an array of promises and serializes them.
 * Each promise in array is chained by .then to the next promise.
 * The result of each promise is reduced into one array.
 * @param {Array} funcArr Array of functions.
 */
const serializedPromiseArr = funcArr =>
  funcArr.reduce(
    (promise, currFunc) =>
      promise.then(result => currFunc().then(Array.prototype.concat.bind(result))),
    Promise.resolve([]),
  );

/**
 * Given an array of values returns a promise which will
 * resolve to an array of results from invoking the function
 * on each value of an array.
 * @param {Array} dataArr Array of values.
 * @param {Function} func Function that should be invoked with each array value.
 * @param {Integer} delayTime Time in MS to delay between function calls.
 */
const sequentialPromise = (dataArr, func, delayTime = 0) =>
  serializedPromiseArr(factoryFuncArr(dataArr, func, delayTime));

module.exports = sequentialPromise;
