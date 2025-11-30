const mongoose = require('mongoose');

const TarefaSchema = new mongoose.Schema({
  texto: { type: String, required: true },
  concluida: { type: Boolean, default: false },
  criadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tarefa', TarefaSchema);
