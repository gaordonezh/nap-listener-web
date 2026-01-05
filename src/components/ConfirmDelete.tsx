import { useState } from 'react';
import { notification, Spin } from 'antd';
import axios from 'axios';
import { API } from 'config/api.config';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import UserService from 'services/UserService';

interface ConfirmDeleteProps {
  open: boolean;
  setOpen: Function;
  handleRefresh: Function;
  endpoint: string;
  title?: string;
  description?: string;
}

const ModalConfirmDelete = (props: ConfirmDeleteProps) => {
  const {
    open,
    setOpen,
    handleRefresh,
    endpoint,
    title = 'Eliminar Registro',
    description = 'Tener en consideración que el registro ya no estará disponible.',
  } = props;
  const [loading, setLoading] = useState(false);

  const deleteRegister = async () => {
    setLoading(true);
    try {
      await axios.delete(`${API}/${endpoint}`, {
        headers: { Authorization: UserService.token() },
      });
      notification.success({
        message: 'Bien!',
        description: 'El registro se eliminó correctamente.',
      });
      handleRefresh();
      setOpen(false);
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
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
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
        <Button disabled={loading} onClick={() => setOpen(false)} variant="outlined">
          CANCELAR
        </Button>
        <Button disabled={loading} onClick={deleteRegister} color="error" variant="contained">
          CONFIRMAR
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirmDelete;
