import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../lib/constants';
import { silentError, debugLog } from '../lib/utils';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

debugLog('API initialized with URL:', API_BASE_URL);

// Interceptor de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      silentError('Cannot reach API server. Check connection settings.');
      debugLog('API URL attempted:', API_BASE_URL);
    } else {
      silentError('API Error: ' + error.message);
    }
    return Promise.reject(error);
  }
);

export default api;

