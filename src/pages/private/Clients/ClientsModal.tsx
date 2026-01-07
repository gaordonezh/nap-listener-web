import { useEffect, useState } from 'react';
import { Form, Input, notification, Spin } from 'antd';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import SubmitButton from 'components/SubmitButton';
import type { ClientProps } from 'services/clients/clients';
import { createClientRequest, updateClientRequest } from 'services/clients/clients.requests';
import { formatPhoneNumber } from 'utils/normalize';

interface ClientsModalProps {
  onClose: VoidFunction;
  onReload: VoidFunction;
  data?: ClientProps;
}

const ClientsModal = ({ onClose, onReload, data }: ClientsModalProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!data) return;
    form.setFieldsValue({
      name: data.name,
      phone: data.phone.slice(4, data.phone.length),
    });
  }, [data]);

  const handleCreate = async (formValues: Record<string, string>) => {
    try {
      setLoading(true);
      const phone = formatPhoneNumber.clean(formValues.phone);

      const body = {
        name: formValues.name,
        phone,
      };

      if (data) await updateClientRequest(data._id, body);
      else await createClientRequest(body);

      onReload();
      onClose();
    } catch (error) {
      notification.error({ title: 'No se registró al cliente', description: String(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle variant="h4" color="textPrimary" align="center">
        {data ? 'Editar' : 'Agregar'} cliente
      </DialogTitle>
      <DialogContent>
        <Spin spinning={loading}>
          <Form form={form} onFinish={handleCreate} layout="vertical">
            <Form.Item name="name" label="Nombre del cliente" rules={[{ required: true, message: 'El nombre es requerido' }]}>
              <Input size="large" placeholder="Ejm.: Netappperu SAC" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Número de celular"
              rules={[
                { required: true, message: 'El celular es requerido' },
                { len: 11, message: 'El número de celular debe tener 9 dígitos' },
              ]}
            >
              <Input
                size="large"
                placeholder="Ejm.: 987 654 321"
                prefix={
                  <Typography fontSize={16} component="span" color="#757575">
                    +51
                  </Typography>
                }
                onChange={(event) => form.setFieldValue('phone', formatPhoneNumber.format(event.target.value))}
              />
            </Form.Item>
          </Form>
        </Spin>
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={onClose} variant="outlined" color="error">
          CANCELAR
        </Button>
        <SubmitButton form={form} loading={loading} onClick={() => form.submit()}>
          GUARDAR {data ? 'CAMBIOS' : ''}
        </SubmitButton>
      </DialogActions>
    </Dialog>
  );
};

export default ClientsModal;
