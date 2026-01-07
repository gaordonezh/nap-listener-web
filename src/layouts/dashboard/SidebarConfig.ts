import { Home, Person, People } from '@mui/icons-material';
import { UserRolEnum } from 'services/user/user.enum';

const sidebarConfig = [
  {
    title: 'Notificaciones',
    path: '/dashboard',
    icon: Home,
    roles: Object.values(UserRolEnum),
  },
  {
    title: 'Clientes',
    path: '/dashboard/clients',
    icon: People,
    roles: [UserRolEnum.SUPERADMIN],
  },
  {
    title: 'Usuarios',
    path: '/dashboard/users',
    icon: Person,
    roles: [UserRolEnum.SUPERADMIN],
  },
];

export default sidebarConfig;
