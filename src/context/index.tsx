import BackDrop from 'components/BackDrop';
import PROJECT_CONFIG from 'config/project.config';
import { createContext, useContext, useState, useEffect, type PropsWithChildren, type Dispatch, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import StorageService from 'services/storageService';
import type { UserProps } from 'services/user/user';
import { validateUser } from 'services/user/user.requests';

export interface ContextProps {
  loading: boolean;
  user: UserProps;
  setUser: Dispatch<SetStateAction<UserProps>>;
}

const AppContext = createContext({} as ContextProps);

export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({} as UserProps);

  useEffect(() => {
    const exists = StorageService.get(PROJECT_CONFIG.LOCAL_AUTH);
    if (exists) {
      getData();
    } else {
      setLoading(false);
    }
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await validateUser();
      // console.log('res:', res);
      // setCompany(res.company);
      setUser(res);
    } catch (error) {
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  return <AppContext.Provider value={{ loading, user, setUser }}>{loading ? <BackDrop loading={loading} /> : children}</AppContext.Provider>;
};

export default AppContextProvider;
