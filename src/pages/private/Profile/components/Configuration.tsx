import { type SyntheticEvent, useState } from 'react';

import { Box, Tab, Tabs } from '@mui/material';

import ConfigurationGeneral from './ConfigurationGeneral';
import ConfigurationPassword from './ConfigurationPassword';
import ConfigurationPhoto from './ConfigurationPhoto';

const Configuration = () => {
  const [actualTab, setActualTab] = useState('1');

  const handleChangeTab = (event: SyntheticEvent, newValue: string) => setActualTab(newValue);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs onChange={handleChangeTab} variant="fullWidth">
          <Tab label="Información General" value="1" sx={{ fontSize: '16px' }} />
          <Tab label="Contraseña" value="2" sx={{ fontSize: '16px' }} />
          <Tab label="Cambiar foto" value="3" sx={{ fontSize: '16px' }} />
        </Tabs>
      </Box>

      <ConfigurationGeneral />

      <ConfigurationPassword />

      <ConfigurationPhoto />
    </>
  );
};

export default Configuration;
