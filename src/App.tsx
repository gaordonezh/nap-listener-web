import { ConfigProvider, theme } from 'antd';
import AppContextProvider from 'context';
import { useLayoutContext } from 'context/layout';
import { BrowserRouter } from 'react-router-dom';
import ConfigRoutes from 'routes';
import ThemeConfig from 'theme';
import GlobalStyles from 'theme/globalStyles';
import WebSocketProvider from 'context/webSocketContext';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

export default function App() {
  dayjs.locale('es');
  const { mode } = useLayoutContext();

  return (
    <BrowserRouter>
      <ThemeConfig mode={mode}>
        <ConfigProvider theme={{ algorithm: mode === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm }}>
          <AppContextProvider>
            <WebSocketProvider>
              <GlobalStyles />
              <ConfigRoutes />
            </WebSocketProvider>
          </AppContextProvider>
        </ConfigProvider>
      </ThemeConfig>
    </BrowserRouter>
  );
}
