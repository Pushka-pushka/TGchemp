import apiClient from './client';

export const getTypes = () => apiClient.get('/types');
export const getGroups = () => apiClient.get('/groups');
export const getGroupsByType = (typeId) => apiClient.get(`/types/${typeId}/groups`);
export const getGroupFormulas = (groupId) => apiClient.get(`/groups/${groupId}/formulas`);
// ... и так далее для всех эндпоинтов