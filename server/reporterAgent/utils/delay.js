const randomNumber = require('./randomNumber');
const { RALogger } = require('../../logging');

/**
 * Delays returns a promise to call a function with value
 * after specified time (adds random time to specified time).
 * @param {Function} func is the function to be invoked.
 * @param {Function Parameter} value to pass into the func when invoked.
 * @param {Integer} time in ms to delay the invocation.
 */
const delay = (func, value, time) =>
  new Promise((resolveDelay, rejectDelay) => {
    // add random time between 1 and 10 seconds to delay
    const randomTime = !time ? 0 : time + randomNumber(1000, 10000);
    RALogger.verbose(` == delay set == ${time} ms == value: ${value} == random time: ${randomTime}`);
    setTimeout(() => {
      try {
        RALogger.verbose(` == delay resolve == ${time} ms == value: ${value}  == random time: ${randomTime}`);
        resolveDelay(func(value));
      } catch (err) {
        RALogger.error(` == delay reject == ${time} ms == value: ${value}  == random time: ${randomTime}`);
        rejectDelay(err);
      }
    }, randomTime);
  });

module.exports = delay;
