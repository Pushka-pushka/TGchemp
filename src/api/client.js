import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1', // URL вашего бэкенда
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Перехватчик для обработки ошибок
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    // Здесь можно добавить глобальную обработку ошибок (например, показать тост)
    return Promise.reject(error);
  }
);

export default apiClient;