/* eslint-disable camelcase */
import { Grid, Typography } from '@mui/material';
import { useAppContext } from 'context';

const MyInformation = () => {
  const { user } = useAppContext();

  if (!user._id) return <></>;

  const { lastname, name } = user;

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h5" sx={{ borderBottom: '3px solid blue', width: 'max-content' }}>
            Información General
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6">Nombres</Typography>
          <Typography variant="body1">{name}</Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6">Apellidos</Typography>
          <Typography variant="body1">{lastname}</Typography>
        </Grid>
        {/* <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6">Usuario</Typography>
          <Typography variant="body1">{username}</Typography>
        </Grid> */}
        {/* <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6">{t_doc}</Typography>
          <Typography variant="body1">{n_doc}</Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6">Dirección</Typography>
          <Typography variant="body1">{address}</Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6">Teléfono</Typography>
          <Typography variant="body1">{phone}</Typography>
        </Grid> */}
      </Grid>
    </>
  );
};

export default MyInformation;
