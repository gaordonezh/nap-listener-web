import { ConfigProvider, theme } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from 'context';
import { useLayoutContext } from 'context/layout';
import WebSocketProvider from 'context/webSocketContext';
import GlobalInformationContextProvider from 'context/GlobalInformationProvider';
import ConfigRoutes from 'routes';
import ThemeConfig from 'theme';
import GlobalStyles from 'theme/globalStyles';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

export default function App() {
  dayjs.locale('es');
  const { mode } = useLayoutContext();

  return (
    <BrowserRouter>
      <ThemeConfig mode={mode}>
        <ConfigProvider theme={{ algorithm: mode === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm }}>
          <GlobalInformationContextProvider>
            <WebSocketProvider>
              <AppContextProvider>
                <GlobalStyles />
                <ConfigRoutes />
              </AppContextProvider>
            </WebSocketProvider>
          </GlobalInformationContextProvider>
        </ConfigProvider>
      </ThemeConfig>
    </BrowserRouter>
  );
}
