import type { AuthUserProps, UserProps, UserQueryProps } from './user';
import { apiServerClient } from 'services/api-client';

export const authUser = async (body: AuthUserProps): Promise<{ token: string; user: UserProps }> => {
  const res = await apiServerClient.post('/auth', body);
  return res.data;
};

export const validateUser = async (): Promise<UserProps> => {
  const res = await apiServerClient.post('/auth/validate', {});
  return res.data;
};

export const getUsersRequest = async (params?: UserQueryProps): Promise<Array<UserProps>> => {
  const res = await apiServerClient.get('/users', { params });
  return res.data;
};

export const createUserRequest = async (body: Omit<UserProps, '_id'>): Promise<UserProps> => {
  const res = await apiServerClient.post('/users', body);
  return res.data;
};

export const updateUserRequest = async (userId: string, body: Omit<UserProps, '_id'>): Promise<UserProps> => {
  const res = await apiServerClient.put(`/users/${userId}`, body);
  return res.data;
};
