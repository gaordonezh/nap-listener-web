import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { type PaletteMode } from '@mui/material';
import PROJECT_CONFIG from 'config/project.config';
import StorageService from 'services/storageService';

interface IContext {
  isOpenSideBarDesktop: boolean;
  setIsOpenSideBarDesktop: Function;
  drawerWidth: number;
  setDrawerWidth: Function;
  isOpenSideBarMobile: boolean;
  setIsOpenSideBarMobile: Function;
  mode: PaletteMode;
  toggleMode: Function;
}

const IS_DARK_MODE = window.matchMedia('(prefers-color-scheme: dark)').matches;

const LayoutContext = createContext({} as IContext);
export const useLayoutContext = () => useContext(LayoutContext);

const LayoutContextProvider = ({ children }: { children: ReactNode }) => {
  const [drawerWidth, setDrawerWidth] = useState(250);

  const [isOpenSideBarDesktop, setIsOpenSideBarDesktop] = useState(true);
  const [isOpenSideBarMobile, setIsOpenSideBarMobile] = useState(false);

  const [mode, setMode] = useState<PaletteMode>(IS_DARK_MODE ? 'dark' : 'light'); // Inicializa con el modo del sistema

  useEffect(() => {
    const userTheme = StorageService.get(PROJECT_CONFIG.LOCAL_THEME);
    if (userTheme) setMode(userTheme as PaletteMode);
  }, []);

  useEffect(() => {
    saveTheme(mode);
  }, [mode]);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';

    setMode(newMode);
  };

  const saveTheme = (mode: PaletteMode) => {
    StorageService.set(PROJECT_CONFIG.LOCAL_THEME, mode);
  };

  return (
    <LayoutContext.Provider
      value={{
        mode,
        toggleMode,
        isOpenSideBarDesktop,
        setIsOpenSideBarDesktop,
        drawerWidth,
        setDrawerWidth,
        isOpenSideBarMobile,
        setIsOpenSideBarMobile,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContextProvider;
