require('ts-node/register');
const config = require('../config/config').default;


const development = {
  url: config.developmentUri,
  dialect: config.dbEngine,
};

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
