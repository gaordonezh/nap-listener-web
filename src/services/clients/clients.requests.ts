import { apiServerClient } from 'services/api-client';
import type { ClientProps, ClientQueryProps } from './clients';

export const getClientsRequest = async (params?: ClientQueryProps): Promise<Array<ClientProps>> => {
  const res = await apiServerClient.get('/clients', { params });
  return res.data;
};

export const createClientRequest = async (body: Omit<ClientProps, '_id'>): Promise<ClientProps> => {
  const res = await apiServerClient.post('/clients', body);
  return res.data;
};

export const updateClientRequest = async (clientId: string, body: Omit<ClientProps, '_id'>): Promise<ClientProps> => {
  const res = await apiServerClient.put(`/clients/${clientId}`, body);
  return res.data;
};
