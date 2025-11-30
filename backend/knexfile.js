const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const useSsl = process.env.PGSSLMODE === 'require' || process.env.NODE_ENV === 'production';

module.exports = {
  development: {
    client: 'pg',
    connection: useSsl
      ? { connectionString, ssl: { rejectUnauthorized: false } }
      : connectionString,
    migrations: {
      directory: __dirname + '/migrations',
    },
  },
};
