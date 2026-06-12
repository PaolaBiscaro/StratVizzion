import api from './client';

export const getKeyResults = () => api.get('/keyresults');

export const getKeyResultById = (id) => api.get(`/keyresults/${id}`);

export const getKeyResultsByOkr = (okrId) => api.get(`/keyresults/okr/${okrId}`);

export const createKeyResult = (body) => api.post('/keyresults', {
  request: {
    okrId: body.okrId,
    jiraProjectId: body.jiraProjectId,
    title: body.title,
    initialValue: body.initialValue,
    goalValue: body.goalValue,
    currentValue: body.currentValue,
    unit: body.unit,
    limitDate: body.limitDate,
    description: body.description,
  }
});