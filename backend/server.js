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

// A conexão com o DB é feita explicitamente quando o servidor é iniciado localmente.
// Para deploy serverless (Vercel) exportamos o `app` e deixamos o runtime
// instanciar conexões sob demanda.
const db = require('./db/knex');

async function startServer() {
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

    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}

// Se este arquivo for executado diretamente (node server.js), iniciar o servidor.
if (require.main === module) {
    startServer();
}

// Exportar o app Express para uso em serverless (Vercel) e testes.
module.exports = app;