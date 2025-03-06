import dotenv from 'dotenv';

dotenv.config();

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
};

console.log({ config });

export default config;
