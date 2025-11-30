import React from 'react';

function StatusBar({ tarefasPendentes, total }) {
  return (
    <div className="status-bar" role="status" aria-live="polite">
      <span className="pending-count">
        <span className="pink-dot" aria-hidden="true"></span> {tarefasPendentes} Tarefas Pendentes
      </span>
      <span className="total-count">{total} Totais</span>
    </div>
  );
}

export default React.memo(StatusBar);
