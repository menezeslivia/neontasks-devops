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


// Inicia o servidor Express
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});