import api from './client';

export const getCycles = () => api.get('/cycles');

export const getCycleById = (id) => api.get(`/cycles/${id}`);

export const createCycle = (body) => api.post('/cycles', {
  cyclesEnum: body.cyclesEnum,
  year: body.year,
});