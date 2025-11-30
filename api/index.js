// Vercel handler: wrap Express app with serverless-http and ensure DB connection
const serverless = require('serverless-http');
const app = require('../backend/server');
const db = require('../backend/db/knex');

const handler = serverless(app);

module.exports = async function (req, res) {
	try {
		await db.ensureConnection();
	} catch (err) {
		console.error('Erro ao assegurar conexão com DB antes de request:', err && err.message);
		// proceed - the app will handle errors
	}

	// serverless-http returns a handler compatible with (req,res)
	return handler(req, res);
};
