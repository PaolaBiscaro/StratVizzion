import api from './client';

export const getUsers = () => api.get('/user/me');

export const updateUser = (id, dadosAtualizados) => {
    return api.put(`/user/${id}`, dadosAtualizados);
};