import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' }
});

// Injeta o token em toda requisição automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Redireciona pro login se o token expirar (mas ignora a tentativa de login)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Verifica se a requisição que deu erro foi a de login
    const isLoginRoute = error.config.url.includes('/login');

    if (error.response?.status === 401 && !isLoginRoute) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;