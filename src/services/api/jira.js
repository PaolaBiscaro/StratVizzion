
import api from "./client";

export const getJiraProjectsByUser = (userId) =>
  api.get(`/jira/projects/${userId}/projects`);