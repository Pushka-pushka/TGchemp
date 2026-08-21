import apiClient from './client';

export const queryAI = (question) => apiClient.post('/query', { question });
export const ingestDocuments = (folderPath) => apiClient.post('/ingest', { folder_path: folderPath });
// ... и так далее