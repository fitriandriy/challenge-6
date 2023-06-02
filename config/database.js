require('dotenv').config();
const {
  DB_HOST,
  DB_USERNAME,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT = 5432,
} = process.env;

const {Client} = require('pg');

const client = new Client({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USERNAME,
  password: DB_PASSWORD,
});

client.connect();

module.exports = client;