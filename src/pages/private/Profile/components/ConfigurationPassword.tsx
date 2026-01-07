import { type FormEvent, useState } from 'react';
import { Button, Grid } from '@mui/material';
import { notification } from 'antd';
import InputPassword from 'components/InputPassword';

const ConfigurationPassword = () => {
  const [actual, setActual] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (actual === '' || newPassword === '' || confirmPassword === '') {
      notification.error({
        message: '¡Error!',
        description: 'Todos los campos son obligatorios.',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      notification.error({
        message: '¡Error!',
        description: 'Las contraseñas no coinciden.',
      });
      return;
    }

    try {
      // const dataToSend = {
      //   user: user._id,
      //   password: actual,
      //   newPassword,
      // };
      // await changePassword(dataToSend);
      notification.success({
        message: '¡Éxito!',
        description: 'Se ha actualizado la contraseña correctamente.',
      });

      setActual('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      notification.error({
        message: '¡Error!',
        description: error.response.data.msg || 'Ha ocurrido un error al actualizar la contraseña.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <InputPassword fullWidth label="Contraseña actual" value={actual} onChange={(e) => setActual(e.target.value)} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InputPassword fullWidth label="Nueva contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InputPassword fullWidth label="Confirmar nueva contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </Grid>
        <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }} mt={2}>
          <Button variant="contained" size="large" color="secondary" type="submit">
            ACTUALIZAR CONTRASEÑA
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ConfigurationPassword;
