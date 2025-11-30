const knex = require('knex');

// Determine database URLs
const EXTERNAL_DATABASE_URL = process.env.DATABASE_URL || process.env.EXTERNAL_DATABASE_URL || process.env.RENDER_DATABASE_URL || process.env.POSTGRES_URL;
const LOCAL_DATABASE_URL = process.env.LOCAL_DATABASE_URL || 'postgres://postgres:postgres@db:5432/neon_tasks';

function createKnexInstance(connectionString, ssl = false) {
  const connection = ssl
    ? { connectionString, ssl: { rejectUnauthorized: false } }
    : { connectionString };

  return knex({
    client: 'pg',
    connection,
    pool: { min: 0, max: 10 },
  });
}

let currentKnex = null;

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

async function testConnection(knexInstance, timeoutMs = 3000) {
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

// Decide qual DB usar: se estivermos em produção (Vercel) e houver EXTERNAL_DATABASE_URL,
// usamos o banco externo (Render) com SSL; caso contrário, usamos o banco local do docker-compose.
function isProductionDeployment() {
  return !!process.env.VERCEL || process.env.NODE_ENV === 'production' || process.env.DEPLOY_ENV === 'production';
}

async function ensureConnection() {
  // If already connected and connection seems fine, keep it.
  if (currentKnex) {
    const ok = await testConnection(currentKnex, 1000).catch(() => false);
    if (ok) return { ok: true, using: currentKnex.__db_source || 'unknown' };
  }

  const useExternal = isProductionDeployment() && !!EXTERNAL_DATABASE_URL;

  if (useExternal) {
    try {
      const externalKnex = createKnexInstance(EXTERNAL_DATABASE_URL, true);
      const okExt = await testConnection(externalKnex, 5000);
      if (okExt) {
        externalKnex.__db_source = 'external';
        currentKnex = externalKnex;
        console.info('DB: conectado ao banco externo (Render) ->', EXTERNAL_DATABASE_URL.replace(/:\/\/.*@/, '://***@'));
        return { ok: true, using: 'external' };
      }
      console.error('DB: não foi possível conectar ao banco externo (Render).');
    } catch (err) {
      console.error('DB: erro ao testar conexão externa:', err && err.message);
    }
  }

  // Tentar banco local (docker compose)
  try {
    const localKnex = createKnexInstance(LOCAL_DATABASE_URL, false);
    const okLocal = await testConnection(localKnex, 5000);
    if (okLocal) {
      localKnex.__db_source = 'local';
      currentKnex = localKnex;
      console.info('DB: conectado ao banco local (docker-compose) ->', LOCAL_DATABASE_URL);
      return { ok: true, using: 'local' };
    }
    console.error('DB: não foi possível conectar ao banco local (db).');
  } catch (err) {
    console.error('DB: erro durante teste de conexão local:', err && err.message);
  }

  return { ok: false, using: null };
}

module.exports = dbProxy;
module.exports.ensureConnection = ensureConnection;
