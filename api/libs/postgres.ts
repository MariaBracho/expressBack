import { Client } from "pg";

async function getConection() {
  try {
    const client = new Client({
      host: "localhost",
      port: 5432,
      user: "admin",
      password: "admin123",
      database: "my_store"
    });

    await client.connect();
    return client;
  } catch (error) {
    console.error(error);
  }
}

export default getConection;
