import React, { useState, useCallback } from 'react';
import './App.css';

import Header from './components/Header';
import AddTaskForm from './components/AddTaskForm';
import StatusBar from './components/StatusBar';
import TaskList from './components/TaskList';
import useTarefas from './hooks/useTarefas';
import useTheme from './hooks/useTheme';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [novaTarefaTexto, setNovaTarefaTexto] = useState('');
  const { isDark, toggle } = useTheme(false);

  const {
    tarefas,
    loading,
    erro,
    adicionarTarefa,
    toggleConcluida,
    excluirTarefa,
    editarTarefa,
    tarefasPendentes,
  } = useTarefas();

  const handleAdd = useCallback(async (e) => {
    e.preventDefault();
    if (!novaTarefaTexto.trim()) return;
    try {
      await adicionarTarefa(novaTarefaTexto.trim());
      setNovaTarefaTexto('');
    } catch (e) {
      // erro já é tratado no hook
    }
  }, [novaTarefaTexto, adicionarTarefa]);

  const onToggle = useCallback((id, status) => toggleConcluida(id, status), [toggleConcluida]);
  const onDelete = useCallback((id) => excluirTarefa(id), [excluirTarefa]);
  const onUpdate = useCallback((id, texto) => editarTarefa(id, texto), [editarTarefa]);

  return (
    <div className={`app-container ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <ErrorBoundary>
        <Header temaEscuro={isDark} toggleTema={toggle} />

        <AddTaskForm
          novaTarefaTexto={novaTarefaTexto}
          setNovaTarefaTexto={setNovaTarefaTexto}
          onAdd={handleAdd}
        />

        {erro && (
          <div className="error-message" role="alert">
            {erro}
          </div>
        )}

        <StatusBar tarefasPendentes={tarefasPendentes} total={tarefas.length} />

        {loading ? (
          <div className="empty-state">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <TaskList tarefas={tarefas} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;