import { Sequelize, Options as SequelizeOptions } from 'sequelize';
import { setupModels } from '@/db/models/index';
import config from '@/config/config';

const { isProd, dbEngine, dbUrl, developmentUri } = config;

const options: SequelizeOptions = {
  dialect: dbEngine as SequelizeOptions['dialect'],
  logging: isProd ? false : console.log,
};

if (isProd) {
  options.dialectModule = require('pg');
}

const url = isProd ? dbUrl : developmentUri;

const sequelize = new Sequelize(url, options);

console.log({ developmentUri });

setupModels(sequelize);

if (!isProd) {
  sequelize.sync();
}

export default sequelize;
