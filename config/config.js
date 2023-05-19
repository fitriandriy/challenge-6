require('dotenv').config();
const {
  PGDATABASE,
  PGUSER,
  PGPASSWORD,
  PGHOST,
  DB_PORT = 5432,
  DIALEC,
} = process.env;

module.exports =  {
  "development": {
    "username": PGUSER,
    "password": PGPASSWORD,
    "database": PGDATABASE,
    "host": PGHOST,
    "dialect": DIALEC,
    "logginh": false,
    "port": DB_PORT
  },
  "test": {
    "username": PGUSER,
    "password": PGPASSWORD,
    "database": PGDATABASE,
    "host": PGHOST,
    "dialect": DIALEC,
    "port": DB_PORT
  },
  "production": {
    "username": PGUSER,
    "password": PGPASSWORD,
    "database": PGDATABASE,
    "host": PGHOST,
    "dialect": DIALEC,
    "port": DB_PORT
  }
}
