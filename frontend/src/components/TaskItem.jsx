import React, { useCallback, useState } from 'react';

function TaskItem({ tarefa, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(tarefa.texto);

  const handleToggle = useCallback(() => onToggle(tarefa.id, tarefa.concluida), [onToggle, tarefa]);
  const handleDelete = useCallback(() => onDelete(tarefa.id), [onDelete, tarefa]);
  const handleEditStart = useCallback((e) => { e.stopPropagation(); setEditing(true); }, []);
  const handleCancel = useCallback((e) => { e.stopPropagation(); setEditing(false); setText(tarefa.texto); }, [tarefa]);
  const handleSave = useCallback(async (e) => {
    e.stopPropagation();
    if (!text.trim()) return;
    await onUpdate(tarefa.id, text.trim());
    setEditing(false);
  }, [onUpdate, tarefa, text]);

  return (
    <div className={`task-item ${tarefa.concluida ? 'completed' : ''}`}>
      <div
        className={`task-text-container ${tarefa.concluida ? 'completed' : ''}`}
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => { if (e.key === 'Enter') handleToggle(); }}
      >
        <span className={`custom-checkbox ${tarefa.concluida ? 'checked' : ''}`} aria-hidden="true"></span>
        {editing ? (
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSave(e); if (e.key === 'Escape') handleCancel(e); }}
            aria-label={`Editar ${tarefa.texto}`}
            style={{ flex: 1, marginLeft: 10 }}
          />
        ) : (
          <span className="task-text">{tarefa.texto}</span>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {editing ? (
          <>
            <button onClick={handleSave} className="purple-button">Salvar</button>
            <button onClick={handleCancel} className="delete-button">Cancelar</button>
          </>
        ) : (
          <>
            <button onClick={handleEditStart} className="icon-button" aria-label={`Editar ${tarefa.texto}`}>✏️</button>
            <button onClick={handleDelete} className="delete-button" aria-label={`Excluir ${tarefa.texto}`}>🗑️</button>
          </>
        )}
      </div>
    </div>
  );
}

export default React.memo(TaskItem);
