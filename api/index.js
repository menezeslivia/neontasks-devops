// Vercel handler that ensures DB conexão antes de delegar ao Express app.
const app = require('../backend/server');
const db = require('../backend/db/knex');

module.exports = async function handler(req, res) {
	try {
		await db.ensureConnection();
	} catch (err) {
		console.error('Erro ao assegurar conexão com DB antes de request:', err && err.message);
		// Continuar mesmo que a conexão falhe; o app pode retornar erros adequados.
	}

	// Delegar a requisição para o Express app
	return app(req, res);
};
