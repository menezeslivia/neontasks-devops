// Simple health check function independent of Express
const db = require('../backend/db/knex');

module.exports = async function (req, res) {
  try {
    await db.ensureConnection();
    return res.status(200).json({ ok: true, db: true });
  } catch (err) {
    console.error('Health check DB error:', err && err.message);
    return res.status(200).json({ ok: true, db: false });
  }
};
