import { apiServerClient } from 'services/api-client';
import type { EventProps, GetEventsParamsProps } from './events';

export const getEventsRequest = async (params: GetEventsParamsProps): Promise<Array<EventProps>> => {
  const res = await apiServerClient.get('/events', { params });
  return res.data;
};
