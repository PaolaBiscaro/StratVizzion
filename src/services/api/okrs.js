import api from './client';

export const getOkrs = () => api.get('/okr');

export const getOkrById = (id) => api.get(`/okr/${id}`);

export const createOkr = (body) => api.post('/okr', {
  title: body.title,
  description: body.description,
  tag: body.tag,
  cycleId: body.cycleId,
  managerId: body.managerId,
});