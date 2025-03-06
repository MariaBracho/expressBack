require('ts-node/register');

const config = require('../config/config').default;

module.exports = {
  development: {
    url: config.dbUrl,
    dialect: config.dbEngine,
  },
  production: {
    url: config.dbUrl,
    dialect: config.dbEngine, // 'postgres'
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
