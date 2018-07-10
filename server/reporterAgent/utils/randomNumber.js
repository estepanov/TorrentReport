/**
 * Returns a random integer between the minValue and maxValue (inclusive).
 * @param {Integer} minValue Smallest possible random value.
 * @param {Integer} maxValue Largest possible random value.
 */
const randomNumber = (minValue, maxValue) => Math.floor(Math.random() * maxValue) + minValue;

module.exports = randomNumber;
