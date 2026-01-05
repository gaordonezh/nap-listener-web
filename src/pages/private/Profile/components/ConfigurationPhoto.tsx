import { Button, Grid, Typography } from '@mui/material';
import { notification, Spin } from 'antd';
import { type FormEvent, useState } from 'react';

const ConfigurationPhoto = () => {
  // const { user, setUser } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([] as File[]);

  const isValidImg = (): boolean => {
    if (files.length === 0) {
      notification.error({
        message: '¡Error!',
        description: 'Debes seleccionar una imagen.',
      });
      return false;
    }

    // if (bytesToMegaBytes(files[0].size) > 4) {
    //   notification.warning({
    //     message: '¡Atención!',
    //     description: 'La imagen debe pesar menos de 4MB.',
    //   });
    //   return false;
    // }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isValidImg()) return;

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', files[0]);

      // const res = await updateProfilePhoto(formData, user._id);

      // setUser(res);
      setFiles([]);

      notification.success({
        message: '¡Correcto!',
        description: 'Tu foto de perfil ha sido actualizada.',
      });
    } catch (error: any) {
      notification.error({
        message: '¡Error!',
        description: error.response.data.msg || 'Ha ocurrido un error al actualizar la contraseña.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Spin spinning={isLoading}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography variant="h5">Foto de perfil</Typography>
          </Grid>
          <Grid size={12}>
            DROPZONE
            {/* <CustomDropZone files={files} setFiles={setFiles} accept={{ 'image/*': ['.jpeg', '.png'] }} /> */}
          </Grid>

          <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }} mt={2}>
            <Button variant="contained" size="large" color="secondary" type="submit">
              ACTUALIZAR FOTO
            </Button>
          </Grid>
        </Grid>
      </form>
    </Spin>
  );
};

export default ConfigurationPhoto;
