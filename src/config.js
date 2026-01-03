// Configurações globais da aplicação
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const config = {
  api: {
    baseURL: API_URL,
    timeout: 10000,
  },
};
