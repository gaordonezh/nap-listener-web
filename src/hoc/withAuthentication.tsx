import PROJECT_CONFIG from 'config/project.config';
import { type ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import StorageService from 'services/storageService';

export default function withAuthentication(Component: ComponentType<any>) {
  const exists = StorageService.get(PROJECT_CONFIG.LOCAL_AUTH);

  if (!exists) {
    return ToLogin;
  }

  return Component;
}

const ToLogin = () => <Navigate to="/login" />;
