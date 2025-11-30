const db = require('./db/knex');

async function test() {
  try {
    const res = await db('tarefas').select('*').limit(1);
    console.log('Query succeeded:', res);
    process.exit(0);
  } catch (err) {
    console.error('DB test failed:', err);
    process.exit(1);
  }
}

test();
