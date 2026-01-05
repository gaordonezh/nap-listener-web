import { Button, Grid, TextField } from '@mui/material';
import { notification } from 'antd';
import { useAppContext } from 'context';
import { type FormEvent, useEffect, useState } from 'react';

const ConfigurationGeneral = () => {
  const { user, setUser } = useAppContext();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (user._id) {
      const { email, phone, address } = user;
      setEmail(email);
      setPhone(phone?.toString() ?? '');
      setAddress(address ?? '');
    }
  }, [user]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const dataToSend = {
        email,
        phone,
        address,
      };
      // const res = await updateUserInfo(dataToSend, user._id);
      // setUser(res);
      notification.success({
        message: '¡Éxito!',
        description: 'Se ha actualizado la información correctamente.',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            label="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="standard"
            fullWidth
            placeholder="prueba@prueba.com"
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            variant="standard"
            fullWidth
            type="number"
            placeholder="999 999 999"
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant="standard"
            fullWidth
            placeholder="Jr Callao N° 365"
          />
        </Grid>
        <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }} mt={2}>
          <Button variant="contained" size="large" color="secondary" type="submit">
            ACTUALIZAR DATOS
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ConfigurationGeneral;
