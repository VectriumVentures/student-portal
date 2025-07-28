import axios from "axios";
import { API_CONFIG, ERROR_MESSAGES } from './constants';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: Date.now()
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common error responses
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - redirect to login
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          break;
        case 403:
          error.message = data?.msg || ERROR_MESSAGES.FORBIDDEN;
          break;
        case 404:
          error.message = data?.msg || ERROR_MESSAGES.NOT_FOUND;
          break;
        case 500:
          error.message = data?.msg || ERROR_MESSAGES.SERVER_ERROR;
          break;
        default:
          error.message = data?.msg || ERROR_MESSAGES.NETWORK_ERROR;
      }
    } else if (error.request) {
      // Network error
      error.message = ERROR_MESSAGES.NETWORK_ERROR;
    }

    return Promise.reject(error);
  }
);

export default api;
