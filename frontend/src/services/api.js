import axios from 'axios';

const resolveBaseUrl = () => {
  // Se a variável de ambiente Vite for fornecida, use-a (ex.: https://neontasks-devops.vercel.app)
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim() !== '') {
    // garante que não haja barra duplicada
    return `${envUrl.replace(/\/$/, '')}/api/tarefas`;
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      // Durante desenvolvimento local o backend foi configurado para rodar na porta 4000
      // (evita conflito com outros serviços que usam 3000). Ajuste se necessário.
      return 'http://localhost:4000/api/tarefas';
    }
  }

  // Em produção (quando servido pela mesma origem), use caminho relativo.
  return '/api/tarefas';
};

const API_BASE_URL = resolveBaseUrl();

export async function fetchTarefas() {
  const res = await axios.get(API_BASE_URL);
  return res.data;
}

export async function createTarefa(texto) {
  const res = await axios.post(API_BASE_URL, { texto });
  return res.data;
}

export async function updateTarefa(id, payload) {
  const res = await axios.put(`${API_BASE_URL}/${id}`, payload);
  return res.data;
}

export async function deleteTarefa(id) {
  const res = await axios.delete(`${API_BASE_URL}/${id}`);
  return res.data;
}

export default {
  fetchTarefas,
  createTarefa,
  updateTarefa,
  deleteTarefa,
};
