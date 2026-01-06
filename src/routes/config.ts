import { lazy } from 'react';
import Loadable from './Loadable';
import { UserRolEnum } from 'services/user/user.enum';

// PUBLIC PAGES
const Login = Loadable(lazy(() => import('pages/public/Login')));
const Page404 = Loadable(lazy(() => import('pages/public/Errors/Page404')));
const ResetWithToken = Loadable(lazy(() => import('pages/public/Errors/ResetWithToken')));
const ForgotPassword = Loadable(lazy(() => import('pages/public/Errors/ForgotPwd')));
const Home = Loadable(lazy(() => import('pages/public/Home')));

// PRIVATE PAGES
const DashboardLayout = Loadable(lazy(() => import('layouts/dashboard')));
const Dashboard = Loadable(lazy(() => import('pages/private/Dashboard')));
const Profile = Loadable(lazy(() => import('pages/private/Profile')));
const Clients = Loadable(lazy(() => import('pages/private/Clients')));

const routes = [
  {
    path: '/',
    element: Home,
    isPrivate: false,
    roles: Object.values(UserRolEnum),
  },
  {
    path: '/dashboard',
    roles: Object.values(UserRolEnum),
    element: DashboardLayout,
    isPrivate: true,
    children: [
      {
        path: '',
        element: Dashboard,
        roles: Object.values(UserRolEnum),
      },
      {
        path: 'clients',
        element: Clients,
        roles: Object.values(UserRolEnum),
      },
      {
        path: 'profile',
        element: Profile,
        roles: Object.values(UserRolEnum),
      },
    ],
  },
  {
    path: '/forgotpassword',
    element: ForgotPassword,
    isPrivate: false,
    roles: Object.values(UserRolEnum),
  },
  {
    path: '/forgotpassword/:token',
    element: ResetWithToken,
    isPrivate: false,
    roles: Object.values(UserRolEnum),
  },
  {
    path: '/login',
    element: Login,
    isPrivate: false,
    roles: Object.values(UserRolEnum),
  },
  {
    path: '*',
    element: Page404,
    isPrivate: false,
    children: [],
    roles: Object.values(UserRolEnum),
  },
];

export default routes;
