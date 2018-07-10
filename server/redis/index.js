const redis = require('redis');
const { logger } = require('../logging');

const connectionString = process.env.REDIS_URL;
if (connectionString === undefined || connectionString === '') {
  throw Error('NEED to set the REDIS_URL environment variable');
}

const client = redis.createClient(connectionString);
client.on('connect', () => {
  logger.info('## Redis Client ## + Connected!');
});
client.on('error', (err) => {
  logger.error(`Error ${err}`);
  throw Error(err);
});

module.exports = client;
