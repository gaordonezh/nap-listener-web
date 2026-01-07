import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import ConfigurationGeneral from './ConfigurationGeneral';
import ConfigurationPassword from './ConfigurationPassword';
import ConfigurationPhoto from './ConfigurationPhoto';

const Configuration = () => {
  const [actualTab, setActualTab] = useState('1');

  const itemsRender = {
    '1': <ConfigurationGeneral />,
    '2': <ConfigurationPassword />,
    '3': <ConfigurationPhoto />,
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={actualTab} onChange={(_, newValue) => setActualTab(newValue)} variant="fullWidth">
          <Tab label="Información General" value="1" sx={{ fontSize: '16px' }} />
          <Tab label="Contraseña" value="2" sx={{ fontSize: '16px' }} disabled />
          <Tab label="Cambiar foto" value="3" sx={{ fontSize: '16px' }} disabled />
        </Tabs>
      </Box>

      {itemsRender[actualTab as keyof typeof itemsRender]}
    </>
  );
};

export default Configuration;
