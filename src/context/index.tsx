import BackDrop from 'components/BackDrop';
import PROJECT_CONFIG from 'config/project.config';
import { createContext, useContext, useState, useEffect, type PropsWithChildren, type Dispatch, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ClientProps } from 'services/clients/clients';
import StorageService from 'services/storageService';
import type { UserProps } from 'services/user/user';
import { UserRolEnum } from 'services/user/user.enum';
import { validateUser } from 'services/user/user.requests';
import { useSocketContext } from './webSocketContext';
import { phoneNumberUtils } from 'utils/normalize';

interface ContextProps {
  loading: boolean;
  user: UserProps;
  isSuperAdmin: boolean;
  setUser: Dispatch<SetStateAction<UserProps>>;
  selectedClient: null | ClientProps;
  handleSetClient: (client: ClientProps) => void;
}

const AppContext = createContext({} as ContextProps);

export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { handleJoin } = useSocketContext();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({} as UserProps);
  const [selectedClient, setSelectedClient] = useState<null | ClientProps>(null);

  useEffect(() => {
    const exists = StorageService.get(PROJECT_CONFIG.LOCAL_AUTH);
    if (!exists) {
      setLoading(false);
      return;
    }

    handleValidate();
  }, []);

  const handleSetClient = (client: ClientProps) => {
    const newPhone = phoneNumberUtils.clean(client.phone, '51');
    const oldPhone = selectedClient ? phoneNumberUtils.clean(selectedClient.phone, '51') : undefined;
    handleJoin(newPhone, oldPhone);
    setSelectedClient(client);
  };

  const handleValidate = async () => {
    try {
      setLoading(true);

      const res = await validateUser();
      setUser(res);
    } catch (error) {
      StorageService.delete(PROJECT_CONFIG.LOCAL_AUTH);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        user,
        setUser,
        isSuperAdmin: user.roles?.includes(UserRolEnum.SUPERADMIN),
        selectedClient,
        handleSetClient,
      }}
    >
      {loading ? <BackDrop loading={loading} /> : children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
