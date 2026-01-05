import { Box, Button, Paper, Typography } from '@mui/material';
import PROJECT_CONFIG from 'config/project.config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StorageService from 'services/storageService';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const exists = StorageService.get(PROJECT_CONFIG.LOCAL_AUTH);

    if (exists) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <Box sx={{ width: '30%', margin: '50px auto' }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h3" textAlign="center">
          {PROJECT_CONFIG.NAME} - {PROJECT_CONFIG.VERSION}
        </Typography>
        <Typography variant="h5" textAlign="center" mb={2}>
          {PROJECT_CONFIG.DESCRIPTION}
        </Typography>
        <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/login')}>
          Iniciar sesión
        </Button>
      </Paper>
    </Box>
  );
};

export default Home;
