const knex = require('knex');

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const useSsl = process.env.PGSSLMODE === 'require' || process.env.NODE_ENV === 'production';

if (!connectionString) {
  console.error('DATABASE_URL / POSTGRES_URL não configurado.');
}

const connection = useSsl
  ? { connectionString, ssl: { rejectUnauthorized: false } }
  : connectionString;

const db = knex({
  client: 'pg',
  connection,
  pool: { min: 0, max: 10 },
});

module.exports = db;
