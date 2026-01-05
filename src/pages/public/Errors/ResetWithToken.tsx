import Page from 'components/Page';
import { useState } from 'react';
import { notification } from 'antd';
import { Stack, Container, Typography, Grid, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

const ResetWithToken = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState({
    form: true,
    good: false,
    bad: false,
  });

  const sendData = async () => {
    if (!token) return;

    try {
      setLoading(true);
      // await resetPassword({ token });
      notification.success({
        message: `Revise su bandeja de entrada`,
        description: 'Se envió un correo con su nueva contraseña.',
      });
      setView({ form: false, good: true, bad: false });
    } catch (error) {
      notification.warning({
        message: `El TOKEN ya fue usado o no es válido.`,
      });
      setView({ form: false, good: false, bad: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Grid container sx={{ minHeight: 'calc((100vh) - 35px)' }} justifyContent="center" alignItems="center">
        <Grid size={12}>
          <Container maxWidth="xs">
            <Stack spacing={2}>
              <Typography variant="h2">NapNegocios</Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {view.form
                  ? 'Confimación de reestablecimiento de contraseña...'
                  : view.good
                  ? 'Revise su bandeja de entrada. Se envió un correo con su nueva contraseña...'
                  : view.bad
                  ? 'El TOKEN ya fue usado o no es válido.'
                  : 'UNDEFINED'}
              </Typography>
              {view.form && (
                <Button fullWidth size="large" variant="contained" color="primary" onClick={sendData}>
                  CONFIRMAR RESTAURACIÓN DE CONTRASEÑA
                </Button>
              )}
              <Button variant="outlined" size="large" fullWidth component={Link} to="/login">
                LLÉVAME A CASA
              </Button>
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </Page>
  );
};

export default ResetWithToken;
