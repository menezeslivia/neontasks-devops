const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.LOCAL_DATABASE_URL;
const useSsl = process.env.PGSSLMODE === 'require' || process.env.NODE_ENV === 'production' || !!process.env.DATABASE_URL;

const common = {
  client: 'pg',
  migrations: {
    directory: __dirname + '/migrations',
  },
};

module.exports = {
  development: Object.assign({}, common, {
    connection: process.env.LOCAL_DATABASE_URL || 'postgres://postgres:postgres@db:5432/neon_tasks',
  }),
  production: Object.assign({}, common, {
    connection: useSsl
      ? { connectionString, ssl: { rejectUnauthorized: false } }
      : connectionString,
  }),
};
