import { createContext, useContext, useState, useEffect, type PropsWithChildren } from 'react';
import PROJECT_CONFIG from 'config/project.config';
import type { ClientProps } from 'services/clients/clients';
import { getClientsRequest } from 'services/clients/clients.requests';
import StorageService from 'services/storageService';
import { notification } from 'antd';
import { getEventsRequest } from 'services/events/events.requests';
import type { EventProps } from 'services/events/events';
import { phoneNumberUtils } from 'utils/normalize';
import { Button } from '@mui/material';
import { getUsersRequest } from 'services/user/user.requests';
import type { UserProps } from 'services/user/user';

type LoadingType = { clients: boolean; events: boolean; users: boolean };

interface ContextProps {
  loading: LoadingType;

  clients: Array<ClientProps>;
  handleGetClients: VoidFunction;

  events: Array<EventProps>;
  handleSetEvents: (data: Array<EventProps>) => void;
  handleGetEvents: (phone: string) => void;

  users: Array<UserProps>;
  handleGetUsers: VoidFunction;
}

const AppContext = createContext({} as ContextProps);

export const useGlobalInformationContext = () => useContext(AppContext);

const GlobalInformationContextProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState<LoadingType>({ clients: false, events: false, users: false });
  const [clients, setClients] = useState<Array<ClientProps>>([]);
  const [events, setEvents] = useState<Array<EventProps>>([]);
  const [users, setUsers] = useState<Array<UserProps>>([]);

  useEffect(() => {
    const exists = StorageService.get(PROJECT_CONFIG.LOCAL_AUTH);
    if (!exists) return;

    handleGetClients();
    handleGetUsers();
  }, []);

  const handleLoading = (key: keyof LoadingType, newValue: boolean) => {
    loading[key] = newValue;
    setLoading({ ...loading });
  };

  const handleSetEvents = (data: Array<EventProps>) => {
    events.push(...data);
    setEvents([...events]);
  };

  const handleGetClients = async () => {
    try {
      handleLoading('clients', true);
      const res = await getClientsRequest();

      const formattedPhone = res.map((item) => ({
        ...item,
        phone: `+51 ${phoneNumberUtils.format(item.phone)}`,
      }));

      setClients([...formattedPhone]);
    } catch (err) {
      notification.error({ title: 'No se logró obtener a los clientes', description: String(err) });
    } finally {
      handleLoading('clients', false);
    }
  };

  const handleGetEvents = async (phoneNumber: string) => {
    try {
      handleLoading('events', true);
      const res = await getEventsRequest({ room: phoneNumber });
      setEvents([...res]);
    } catch (err) {
      notification.error({
        title: 'No se pudo obtener el listado de notificaciones',
        description: 'Vuelva a carga la página o vuelva mas tarde',
        actions: [<Button onClick={() => handleGetEvents(phoneNumber)}>Volver a cargar</Button>],
      });
    } finally {
      handleLoading('events', false);
    }
  };

  const handleGetUsers = async () => {
    try {
      handleLoading('users', true);
      const res = await getUsersRequest();
      setUsers([...res]);
    } catch (err) {
      notification.error({ title: 'No se logró obtener a los usuarios', description: String(err) });
    } finally {
      handleLoading('users', false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        clients,
        handleGetClients,
        events,
        handleGetEvents,
        handleSetEvents,
        users,
        handleGetUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default GlobalInformationContextProvider;
