const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Expor variável de conexão para debug
const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.MONGO_URI;
if (!dbUrl) console.warn('Nenhuma DATABASE_URL / POSTGRES_URL configurada; a API pode não conectar ao DB.');

const tarefasRouter = require('./routes/tarefas.routes');
app.use('/api/tarefas', tarefasRouter);

// Aguarda confirmação da conexão com o banco antes de iniciar o servidor.
// A função `ensureConnection` tentará conectar ao banco local (serviço `db`) primeiro
// e fará failover para `DATABASE_URL` caso o local não responda.
const db = require('./db/knex');

(async function start() {
    try {
        const result = await db.ensureConnection();
        if (!result.ok) {
            console.warn('Aviso: não foi possível conectar ao banco local nem ao remoto. Iniciando o servidor mesmo assim.');
        } else {
            console.log('Conexão com banco estabelecida (modo:', result.using + ')');
        }
    } catch (err) {
        console.error('Erro durante a verificação da conexão com o DB:', err && err.message);
    }

    // Inicia o servidor Express
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
})();