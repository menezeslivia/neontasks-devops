import { useEffect, useState, useCallback, useMemo } from 'react';
import * as api from '../services/api';

export default function useTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let mounted = true;

    async function carregar() {
      setLoading(true);
      try {
        const data = await api.fetchTarefas();
        if (mounted) setTarefas(data);
      } catch (e) {
        console.error('Erro ao buscar tarefas:', e);
        if (mounted) setErro('Não foi possível carregar tarefas. Verifique o backend.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    carregar();
    return () => {
      mounted = false;
    };
  }, []);

  const adicionarTarefa = useCallback(async (texto) => {
    try {
      setErro('');
      const newT = await api.createTarefa(texto);
      setTarefas(prev => [newT, ...prev]);
      return newT;
    } catch (e) {
      console.error('Erro ao adicionar tarefa:', e);
      setErro('Erro ao adicionar tarefa. Veja o console para mais detalhes.');
      throw e;
    }
  }, []);

  const toggleConcluida = useCallback(async (id, statusAtual) => {
    try {
      const updated = await api.updateTarefa(id, { concluida: !statusAtual });
      setTarefas(prev => prev.map(t => (t.id === id ? updated : t)));
      return updated;
    } catch (e) {
      console.error('Erro ao atualizar tarefa:', e);
      setErro('Erro ao atualizar tarefa.');
      throw e;
    }
  }, []);

  const excluirTarefa = useCallback(async (id) => {
    try {
      await api.deleteTarefa(id);
      setTarefas(prev => prev.filter(t => t.id !== id));
    } catch (e) {
      console.error('Erro ao excluir tarefa:', e);
      setErro('Erro ao excluir tarefa.');
      throw e;
    }
  }, []);

  const editarTarefa = useCallback(async (id, texto) => {
    try {
      const updated = await api.updateTarefa(id, { texto });
      setTarefas(prev => prev.map(t => (t.id === id ? updated : t)));
      return updated;
    } catch (e) {
      console.error('Erro ao editar tarefa:', e);
      setErro('Erro ao editar tarefa.');
      throw e;
    }
  }, []);

  const tarefasPendentes = useMemo(() => tarefas.filter(t => !t.concluida).length, [tarefas]);

  return {
    tarefas,
    loading,
    erro,
    adicionarTarefa,
    toggleConcluida,
    excluirTarefa,
    editarTarefa,
    tarefasPendentes,
  };
}
