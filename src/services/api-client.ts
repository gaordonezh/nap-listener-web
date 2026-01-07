import axios, { type InternalAxiosRequestConfig } from 'axios';
import StorageService from './storageService';
import PROJECT_CONFIG from 'config/project.config';

const apiBaseUrl: string = import.meta.env.VITE_API;

const apiServerClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

const interceptor = (config: InternalAxiosRequestConfig<any>) => {
  const token = StorageService.get(PROJECT_CONFIG.LOCAL_AUTH);
  config.headers.Authorization = token && `Bearer ${token}`;
  return config;
};

apiServerClient.interceptors.request.use(interceptor);

export { apiBaseUrl, apiServerClient };
