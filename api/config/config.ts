import dotenv from 'dotenv';

dotenv.config();

const USER = encodeURIComponent(process.env.DB_USER ?? '');
const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD ?? '');
const DB_HOST = process.env.DB_HOST ?? '';
const DB_NAME = process.env.DB_NAME ?? '';
const DB_PORT = process.env.DB_PORT ?? '';

const DEVELOPMENT_URI = `postgres://${USER}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const config = {
  env: process.env.NODE_ENV ?? 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT ?? 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbEngine: process.env.DB_ENGINE ?? 'postgresql',
  dbUrl: process.env.DATABASE_URL ?? '',
  developmentUri: DEVELOPMENT_URI,
};

export default config;
