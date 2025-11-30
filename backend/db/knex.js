const knex = require('knex');
const { Client } = require('pg');

// Estratégia de conexão: conectar exclusivamente ao banco local provisionado pelo
// docker-compose (host 'db'). Não há fallback para serviços externos (Render).

const LOCAL_DATABASE_URL = process.env.LOCAL_DATABASE_URL || 'postgres://postgres:postgres@db:5432/neon_tasks';

function createKnexInstance(connectionString, ssl = false) {
  // For local Postgres we explicitly disable SSL to avoid honoring PGSSLMODE from .env
  const connection = ssl
    ? { connectionString, ssl: { rejectUnauthorized: false } }
    : { connectionString, ssl: false };

  return knex({
    client: 'pg',
    connection,
    pool: { min: 0, max: 10 },
  });
}

// Instância inicial apontando para o banco local
let currentKnex = createKnexInstance(LOCAL_DATABASE_URL, false);

// Proxy callable que delega para currentKnex. Isso permite usar `db('table')`.
const dbProxy = new Proxy(function () {}, {
  apply(_target, thisArg, args) {
    return currentKnex.apply(thisArg, args);
  },
  get(_target, prop) {
    const val = currentKnex[prop];
    if (typeof val === 'function') return val.bind(currentKnex);
    return val;
  },
  set(_target, prop, value) {
    currentKnex[prop] = value;
    return true;
  },
});

async function testConnection(knexInstance, timeoutMs = 2000) {
  try {
    await Promise.race([
      knexInstance.raw('select 1'),
      new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), timeoutMs)),
    ]);
    return true;
  } catch (err) {
    return false;
  }
}

// Garante conexão com o banco local; não tenta fallback para nenhum DB externo.
async function ensureConnection() {
  try {
    const localKnex = createKnexInstance(LOCAL_DATABASE_URL, false);
    const okLocal = await testConnection(localKnex, 5000);
    if (okLocal) {
      currentKnex = localKnex;
      console.info('DB: conectado ao banco local (docker-compose) ->', LOCAL_DATABASE_URL);
      return { ok: true, using: 'local' };
    }

    console.error('DB: não foi possível conectar ao banco local (db). Nenhum fallback configurado.');
  } catch (err) {
    console.error('DB: erro durante teste de conexão local:', err && err.message);
  }

  return { ok: false, using: null };
}

module.exports = dbProxy;
module.exports.ensureConnection = ensureConnection;
