import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Typography, Grid } from '@mui/material';
// ----------------------------------------------------------------------

export default function Page401() {
  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="95vh">
      <Grid>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            No tiene autorización para ingresar a esta página
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Lo sentimos, no pudimos encontrar la página que busca. ¿Quizás ha escrito mal la URL? Asegúrese de usar la navegación para una buena
            experiencia de usuario.
          </Typography>

          <Box component="img" src="/static/logo.png" sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }} />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            LLÉVAME A CASA
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
