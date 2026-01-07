import Page from 'components/Page';
import { useState } from 'react';
import { Stack, Container, Typography, Grid, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ForgotPwd = () => {
  const [view, setView] = useState({
    form: true,
    good: false,
    bad: false,
  });

  const newTry = () => setView({ form: true, good: false, bad: false });

  return (
    <Page>
      <Grid container sx={{ minHeight: 'calc((100vh) - 35px)' }} justifyContent="center" alignItems="center">
        <Grid size={12}>
          <Container maxWidth="xs">
            <form autoComplete="off">
              <Stack spacing={2}>
                <Typography variant="h2">NapNegocios</Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {view.form
                    ? 'Ingrese su número de documento para continuar...'
                    : view.good
                    ? 'Se envió un correo con los pasos a seguir para reestablecer su contraseña...'
                    : view.bad
                    ? 'El número de documento no coinciden con nuestros registros.'
                    : 'UNDEFINED'}
                </Typography>
                {view.form && <TextField fullWidth label="Nro documento" type="number" />}
                {view.form && (
                  <Button fullWidth size="large" type="submit" variant="contained" color="primary">
                    REESTABLECER CONTRASEÑA
                  </Button>
                )}
                {view.bad && (
                  <Button variant="contained" size="large" fullWidth onClick={newTry}>
                    UNA NUEVA OPORTUNIDAD
                  </Button>
                )}
                <Button variant="outlined" size="large" fullWidth component={Link} to="/login">
                  LLÉVAME A CASA
                </Button>
              </Stack>
            </form>
          </Container>
        </Grid>
      </Grid>
    </Page>
  );
};

export default ForgotPwd;
