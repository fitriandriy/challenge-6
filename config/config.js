require('dotenv').config();
const {
  PGDATABASE,
  PGUSER,
  PGPASSWORD,
  PGHOST,
  DIALEC,
} = process.env;

module.exports =  {
  "development": {
    "username": PGUSER,
    "password": PGPASSWORD,
    "database": PGDATABASE,
    "host": PGHOST,
    "dialect": DIALEC,
    "logginh": false
  },
  "test": {
    "username": PGUSER,
    "password": PGPASSWORD,
    "database": PGDATABASE,
    "host": PGHOST,
    "dialect": DIALEC
  },
  "production": {
    "username": PGUSER,
    "password": PGPASSWORD,
    "database": PGDATABASE,
    "host": PGHOST,
    "dialect": DIALEC
  }
}
