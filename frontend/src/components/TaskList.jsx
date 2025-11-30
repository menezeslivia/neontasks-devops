import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tarefas, onToggle, onDelete, onUpdate }) {
  if (!tarefas || tarefas.length === 0) {
    return (
      <div className="empty-state">
        <div className="loading-spinner" aria-hidden="true"></div>
        <p>Nenhuma tarefa ainda. Adicione uma para começar</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tarefas.map(t => (
        <TaskItem key={t.id} tarefa={t} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
}

export default React.memo(TaskList);
