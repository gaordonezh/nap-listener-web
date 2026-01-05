import { Outlet } from 'react-router-dom';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

import { Box } from '@mui/material';
import { useLayoutContext } from 'context/layout';
import withAuthentication from 'hoc/withAuthentication';

const DashboardLayout = () => {
  const { isOpenSideBarDesktop, drawerWidth } = useLayoutContext();

  return (
    <>
      <DashboardNavbar />
      <DashboardSidebar />

      <Box
        sx={(theme) => ({
          flexGrow: 1,
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          paddingTop: '95px',
          [theme.breakpoints.up('lg')]: {
            marginLeft: isOpenSideBarDesktop ? `${drawerWidth}px` : '0px',
            transition: 'all 0.3s ease',
          },
        })}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default withAuthentication(() => DashboardLayout());
