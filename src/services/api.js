import axios from 'axios';

const api = axios.create({
  // Ajustado para a porta 5000 que vimos nos logs do seu .NET
  baseURL: 'http://localhost:5000', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// INTERCEPTOR: Injeta o Token JWT automaticamente em cada requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Altere para a chave exata que você usa (ex: 'token' ou 'jwt')
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;