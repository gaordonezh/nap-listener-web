import { Button, Grid, TextField } from '@mui/material';
import { notification } from 'antd';
import { useAppContext } from 'context';
import { type FormEvent, useEffect, useState } from 'react';

const ConfigurationGeneral = () => {
  const { user, setUser } = useAppContext();

  const [fields, setFields] = useState({ name: '', lastname: '' });

  useEffect(() => {
    if (user._id) {
      const { name, lastname } = user;
      setFields({ lastname, name });
    }
  }, [user]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setUser({ ...user, ...fields });
      notification.success({
        message: '¡Éxito!',
        description: 'Se ha actualizado la información correctamente.',
      });
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSave}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            label="Nombres"
            value={fields.name}
            onChange={(e) => setFields({ ...fields, name: e.target.value })}
            variant="standard"
            fullWidth
            placeholder="prueba@prueba.com"
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Apellidos"
            value={fields.lastname}
            onChange={(e) => setFields({ ...fields, lastname: e.target.value })}
            variant="standard"
            fullWidth
            placeholder="prueba@prueba.com"
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
