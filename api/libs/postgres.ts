import { Client } from 'pg';

// example of a connection string with Client from pg, without Pool

async function getConection() {
  try {
    const client = new Client({
      host: 'localhost',
      port: 5432,
      user: 'admin',
      password: 'admin123',
      database: 'my_store',
    });

    await client.connect();
    return client;
  } catch (error) {
    console.error(error);
  }
}

export default getConection;
