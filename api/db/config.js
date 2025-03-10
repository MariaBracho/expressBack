require('ts-node/register');

const config = require('../config/config').default;

/**
 * @type {import('sequelize').Options}
 */
const development = {
  url: config.dbUrl,
  dialect: config.dbEngine,
};

/**
 * @type {import('sequelize').Options}
 */
const production = {
  url: config.dbUrl,
  dialect: config.dbEngine, // 'postgres'
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

module.exports = {
  development,
  production,
};
