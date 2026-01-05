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
  const cookie = StorageService.get(PROJECT_CONFIG.LOCAL_AUTH);
  console.log({ cookie });

  //   if (config.method === 'get') {
  //     if (typeof config.params !== 'object') config.params = {};

  //     if (config.params.company === 'omit') config.params.company = undefined;
  //     else config.params.company ??= company;

  //     if (config.params.headquarter === 'omit') config.params.headquarter = undefined;
  //     else config.params.headquarter ??= headquarter;
  //   }

  // config.headers.Authorization = token && `Bearer ${token}`;
  return config;
};

apiServerClient.interceptors.request.use(interceptor);

export { apiServerClient };
