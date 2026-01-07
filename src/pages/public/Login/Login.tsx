import { Box, Paper, Typography, styled, TextField } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Form, Spin, notification } from 'antd';
import { useAppContext } from 'context';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from 'components/SubmitButton';
import PROJECT_CONFIG from 'config/project.config';
import InputPassword from 'components/InputPassword';
import { authUser } from 'services/user/user.requests';
import type { AuthUserProps } from 'services/user/user';
import StorageService from 'services/storageService';

export const LoginWrapper = styled(Box)(({ theme }) => ({
  padding: '20px',
  backgroundColor: theme.palette.background.default,
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const LoginPaper = styled(Paper)(({}) => ({
  padding: '20px',
  width: '400px',
}));

export default function Login() {
  const { setUser } = useAppContext();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const exists = StorageService.get(PROJECT_CONFIG.LOCAL_AUTH);
    if (exists) {
      navigate('/dashboard');
    }
  }, []);

  const onSubmit = async (values: AuthUserProps) => {
    try {
      setLoading(true);

      const res = await authUser(values);

      StorageService.set(PROJECT_CONFIG.LOCAL_AUTH, res.token);
      setUser(res.user);

      window.location.href = '/dashboard';
    } catch (error: any) {
      notification.warning({
        message: error.message || 'Sus credenciales no concuerdan con nuestros registros',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <LoginPaper elevation={3}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Box mb={2}>
            <Typography color="primary" variant="h3" textAlign="center">
              {PROJECT_CONFIG.NAME}
            </Typography>
            <Typography variant="subtitle1" textAlign="center">
              Ingresa tus credenciales para continuar
            </Typography>
          </Box>

          <Spin spinning={isLoading}>
            <Form form={form} onFinish={onSubmit} initialValues={{ username: 'netappperusac@gmail.com', password: 'Nap2025+' }}>
              <Form.Item name="username" rules={[{ required: true, message: 'El usuario es requerido' }]}>
                <TextField fullWidth label="Usuario" />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: 'La contraseña es requerida' }]}>
                <InputPassword fullWidth label="Contraseña" />
              </Form.Item>

              <Form.Item>
                <RouterLink color="primary" to="/forgotpassword">
                  ¿Olvidó su contraseña?
                </RouterLink>
              </Form.Item>

              <SubmitButton fullWidth form={form}>
                Ingresar
              </SubmitButton>
            </Form>
          </Spin>
        </Box>
      </LoginPaper>
    </LoginWrapper>
  );
}
