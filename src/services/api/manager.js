import api from './client';

export const getJiraProjects = (userId, jiraBaseUrl) => {
    return api.get(`/jira/projects/${userId}/projects`, {
        params: {
            jiraBaseUrl: jiraBaseUrl
        }
    });
};

export const getOkrsDropdown = (managerId) => {
    return api.get(`/okr/manager/${managerId}`); 
};

export const getOkrMetrics = (okrId) => {

    return api.get(`/api/OkrHistories/okrs/${okrId}`);
};

export const getOkrTeam = (okrId) => {
    return api.get(`/api/JiraTask/okrs/${okrId}/team`);
};

export const getKrDetails = (keyResultId) => {
    return api.get(`/api/JiraTask/keyresults/${keyResultId}`);
};

export const syncJiraTasks = (krId) => {
    return api.post(`/api/JiraTask/okrs/${krId}/sync`);
};  