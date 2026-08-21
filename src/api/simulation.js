import apiClient from './client';

export const startSession = (data) => apiClient.post('/simulation/sessions/start', data);
export const getSessionStates = (sessionId) => apiClient.get(`/simulation/sessions/${sessionId}/states`);
export const logAction = (sessionId, data) => apiClient.post(`/simulation/sessions/${sessionId}/actions`, data);
export const stopSession = (sessionId, finalStatus) => apiClient.post(`/simulation/sessions/${sessionId}/stop?final_status=${finalStatus}`);
export const calculateFormula = (data) => apiClient.post('/formulas/calculate', data);