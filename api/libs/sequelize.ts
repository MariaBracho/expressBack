import { Sequelize, Options as SequelizeOptions } from 'sequelize';
import config from '../config/config';
import { setupModels } from '../db/models/index';

// const USER = encodeURIComponent(config.dbUser ?? '');
// const PASSWORD = encodeURIComponent(config.dbPassword ?? '');
// const DB_HOST = config.dbHost ?? '';
// const DB_NAME = config.dbName ?? '';
// const DB_PORT = config.dbPort ?? '';

// const URI = `postgres://${USER}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const options: SequelizeOptions = {
  dialect: config.dbEngine as SequelizeOptions['dialect'],
  logging: config.isProd ? false : console.log,
};

if (config.isProd) {
  options.dialectModule = require('pg');
}

console.log({ isProd: config.isProd, env: process.env.NODE_ENV });

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
sequelize.sync();

export default sequelize;
