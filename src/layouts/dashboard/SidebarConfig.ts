import { TrendingUp, Checklist, Home } from '@mui/icons-material';
import { UserRolEnum } from 'services/user/user.enum';

// ----------------------------------------------------------------------
const sidebarConfig = [
  {
    title: 'Inicio',
    path: '/dashboard',
    icon: Home,
    roles: Object.values(UserRolEnum),
  },
  {
    title: 'Clientes',
    path: '/dashboard/clients',
    icon: Checklist,
    roles: Object.values(UserRolEnum),
  },
  {
    title: 'Not Found',
    path: '/dashboard/not-found',
    icon: TrendingUp,
    roles: Object.values(UserRolEnum),
  },
];

export default sidebarConfig;
