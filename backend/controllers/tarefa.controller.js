const db = require('../db/knex');

async function listar(req, res) {
  try {
    const tarefas = await db('tarefas').select('*').orderBy('criado_em', 'desc');
    res.json(tarefas);
  } catch (error) {
    console.error('Erro listar tarefas:', error);
    res.status(500).json({ message: error.message });
  }
}

async function criar(req, res) {
  try {
    const { texto } = req.body;
    if (!texto || !texto.trim()) return res.status(400).json({ message: 'Texto é obrigatório' });
    const [tarefa] = await db('tarefas').insert({ texto: texto.trim() }).returning('*');
    res.status(201).json(tarefa);
  } catch (error) {
    console.error('Erro criar tarefa:', error);
    res.status(400).json({ message: error.message });
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { texto, concluida } = req.body;
    const updates = {};
    if (texto !== undefined) updates.texto = texto;
    if (concluida !== undefined) updates.concluida = concluida;

    const [tarefa] = await db('tarefas').where({ id }).update(updates).returning('*');
    if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json(tarefa);
  } catch (error) {
    console.error('Erro atualizar tarefa:', error);
    res.status(400).json({ message: error.message });
  }
}

async function remover(req, res) {
  try {
    const { id } = req.params;
    const quantidade = await db('tarefas').where({ id }).del();
    if (!quantidade) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json({ message: 'Tarefa removida com sucesso' });
  } catch (error) {
    console.error('Erro remover tarefa:', error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = { listar, criar, atualizar, remover };
