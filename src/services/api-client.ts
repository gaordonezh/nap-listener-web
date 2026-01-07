import axios, { type InternalAxiosRequestConfig } from 'axios';
import StorageService from './storageService';
import PROJECT_CONFIG from 'config/project.config';

const apiServerClient = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

const interceptor = (config: InternalAxiosRequestConfig<any>) => {
  const token = StorageService.get(PROJECT_CONFIG.LOCAL_AUTH);
  console.log(token);
  config.headers.Authorization = token && `Bearer ${token}`;
  return config;
};

apiServerClient.interceptors.request.use(interceptor);

export { apiServerClient };
