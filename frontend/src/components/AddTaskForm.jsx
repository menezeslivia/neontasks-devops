import React from 'react';

function AddTaskForm({ novaTarefaTexto, setNovaTarefaTexto, onAdd }) {
  return (
    <form onSubmit={onAdd} className="add-task-form">
      <input
        type="text"
        placeholder="O que precisa ser feito hoje?"
        value={novaTarefaTexto}
        onChange={(e) => setNovaTarefaTexto(e.target.value)}
        aria-label="Novo item"
      />
      <button type="submit" className="purple-button">
        + Adicionar
      </button>
    </form>
  );
}

export default React.memo(AddTaskForm);
