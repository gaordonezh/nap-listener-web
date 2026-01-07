import { useState } from 'react';
import { notification, Spin } from 'antd';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { apiServerClient } from 'services/api-client';

interface ConfirmDeleteProps {
  handleClose: VoidFunction;
  handleRefresh: VoidFunction;
  endpoint: string;
  title?: string;
  description?: string;
}

const ModalConfirmDelete = (props: ConfirmDeleteProps) => {
  const {
    handleClose,
    handleRefresh,
    endpoint,
    title = 'Eliminar Registro',
    description = 'Tener en consideración que el registro ya no estará disponible.',
  } = props;
  const [loading, setLoading] = useState(false);

  const deleteRegister = async () => {
    try {
      setLoading(true);

      await apiServerClient.delete(endpoint);

      notification.success({
        message: 'Bien!',
        description: 'El registro se eliminó correctamente.',
      });
      handleRefresh();
      handleClose();
    } catch (error) {
      notification.error({
        message: 'Oops!',
        description: `Ocurrió un error al tratar de eliminar el registro.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Typography variant="h4" color="textPrimary" align="center" component="p" style={{ fontSize: '1.3rem', fontWeight: 600 }}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Spin spinning={loading}>
          <Typography variant="caption" color="textSecondary" style={{ fontSize: '1rem', fontWeight: 400 }}>
            {description}
          </Typography>
        </Spin>
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={handleClose} variant="outlined">
          CANCELAR
        </Button>
        <Button loading={loading} onClick={deleteRegister} color="error" variant="contained">
          CONFIRMAR
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirmDelete;
