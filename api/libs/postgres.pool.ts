import { Pool } from "pg";
import config from "../config/config";

const USER = encodeURIComponent(config.dbUser ?? "");
const PASSWORD = encodeURIComponent(config.dbPassword ?? "");
const DB_HOST = config.dbHost ?? "";
const DB_NAME = config.dbName ?? "";
const DB_PORT = config.dbPort ?? "";

const URI = `postgres://${USER}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const pool = new Pool({
  connectionString: URI
});

export default pool;
