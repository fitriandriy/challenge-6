require('dotenv').config();
const {
  PGHOST,
  PGUSER,
  PGDATABASE,
  PGPASSWORD,
  PGPORT = 5432,
} = process.env;

const {Client} = require('pg');

const client = new Client({
  host: PGHOST,
  port: PGPORT,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
});

client.connect();

module.exports = client;