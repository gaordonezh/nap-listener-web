import { Fragment, useEffect, useState } from 'react';
import { Divider, Form, Input, notification, Spin } from 'antd';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import SubmitButton from 'components/SubmitButton';
import type { UserProps } from 'services/user/user';
import { createUserRequest, updateUserRequest } from 'services/user/user.requests';
import InputPassword from 'components/InputPassword';
import { UserRolEnum } from 'services/user/user.enum';

interface UsersModalProps {
  onClose: VoidFunction;
  onReload: VoidFunction;
  data?: UserProps;
}

const UsersModal = ({ onClose, onReload, data }: UsersModalProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!data) return;

    form.setFieldsValue({
      name: data.name,
      lastname: data.lastname,
    });
  }, [data]);

  const handleCreate = async (formValues: Record<string, string>) => {
    try {
      setLoading(true);

      const body: Omit<UserProps, '_id'> = {
        name: formValues.name,
        lastname: formValues.lastname,
        roles: data ? data.roles : [UserRolEnum.CLIENT],
      };
      if (!data) {
        body.username = formValues.username;
        body.password = formValues.password;
      }

      if (data) await updateUserRequest(data._id, body);
      else await createUserRequest(body);

      onReload();
      onClose();
    } catch (error) {
      notification.error({ title: 'No se registró al usuario', description: String(error) });
    } finally {
      setLoading(false);
    }
  };

  const requiredField = { required: true, message: 'Este campo es requerido' };

  return (
    <Dialog open fullWidth maxWidth="xs">
      <DialogTitle variant="h4" color="textPrimary" align="center">
        {data ? 'Editar' : 'Agregar'} usuario
      </DialogTitle>
      <DialogContent>
        <Spin spinning={loading}>
          <Form form={form} onFinish={handleCreate} layout="vertical">
            <Form.Item name="name" label="Nombres" rules={[requiredField, { min: 3, message: 'Mínimo 3 caracteres' }]}>
              <Input size="large" placeholder="Ejm.: Juan" />
            </Form.Item>

            <Form.Item name="lastname" label="Apellidos" rules={[requiredField, { min: 3, message: 'Mínimo 3 caracteres' }]}>
              <Input size="large" placeholder="Ejm.: Perez" />
            </Form.Item>

            {data ? null : (
              <Fragment>
                <Divider>Autenticación</Divider>

                <Form.Item name="username" label="Usuario" rules={[requiredField, { min: 5, message: 'Mínimo 5 caracteres' }]}>
                  <Input size="large" placeholder="Ejm.: username" />
                </Form.Item>

                <Form.Item name="password" label="Contraseña" rules={[requiredField, { min: 5, message: 'Mínimo 5 caracteres' }]}>
                  <InputPassword
                    label="-"
                    fullWidth
                    size="small"
                    placeholder="Ejm.: password"
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: {
                        sx(theme) {
                          return { bgcolor: theme.palette.mode === 'dark' ? '#141414' : '#fff', borderTop: '1px solid #ddd' };
                        },
                      },
                    }}
                  />
                </Form.Item>
              </Fragment>
            )}
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

export default UsersModal;
