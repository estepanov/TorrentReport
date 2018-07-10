require('dotenv').config();
const reporterAgent = require('../server/reporterAgent');

const startTime = new Date();
const elapsedTime = (startTime) => {
  const endTime = new Date();
  const miliseconds = endTime - startTime;
  const minutes = Math.floor(miliseconds / 1000 / 60);
  return minutes;
};

console.log('Scrape Initiated.');
reporterAgent(undefined, true)
  .then((_) => {
    console.log('Scrape complete.');
    console.log(`Time elapsed: ${elapsedTime(startTime)} minutes`);
    process.exit(0);
  })
  .catch((err) => {
    console.log('Scrape encountered an error.');
    console.log(`Time elapsed: ${elapsedTime(startTime)} minutes`);
    console.log('error:');
    console.log(err);
    process.exit(1);
  });
