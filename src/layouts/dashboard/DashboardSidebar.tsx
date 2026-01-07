import { useEffect, useState } from 'react';
import { Box, Drawer, SwipeableDrawer, Toolbar, Divider } from '@mui/material';
import NavSection from './NavSection';
import sidebarConfig from './SidebarConfig';
import { useAppContext } from 'context';
import { useLayoutContext } from 'context/layout';
import SelectClients from 'components/selects/SelectClients';

export default function DashboardSidebar() {
  const { isOpenSideBarDesktop, isOpenSideBarMobile, setIsOpenSideBarMobile, drawerWidth } = useLayoutContext();
  const { selectedClient, handleSetClient, user } = useAppContext();

  const [newItems, setNewItems] = useState<typeof sidebarConfig>([]);

  useEffect(() => {
    if (user?.roles?.length) {
      const sideBarFilter = [] as typeof sidebarConfig;
      sidebarConfig.forEach((item) => {
        // Si los roles del usuario no cumplen con  los roles del modulo, no lo muestro
        const findRoles = item.roles.find((role) => user.roles.includes(role));
        if (!findRoles) return;

        const itemToPush = {
          ...item,
        };

        // const filterChildren: Array<{ title: string; path: string; roles: Array<UserRolEnum> }> = [];
        // if (item.children) {
        //   item.children.forEach((children) => {
        //     // Si los roles del usuario no cumplen con  los roles del modulo, no lo muestro
        //     const findRoles = children.roles.find((role) => user?.roles?.includes(role));
        //     if (!findRoles) return;

        //     filterChildren.push(children);
        //   });
        // }

        // if (filterChildren.length) itemToPush.children = filterChildren;

        sideBarFilter.push(itemToPush);
      });

      setNewItems([...sideBarFilter]);
    }
  }, [user, sidebarConfig]);

  const renderContent = (
    <Box sx={{ height: 'calc((100vh) - 85px)' }}>
      <NavSection navConfig={newItems} />
    </Box>
  );

  const renderContentMobil = (
    <Box sx={{ height: 'calc((100vh))' }}>
      <NavSection navConfig={newItems} />
    </Box>
  );

  return (
    <>
      <Box sx={{ display: { lg: 'none', xs: 'block' } }}>
        <SwipeableDrawer
          open={isOpenSideBarMobile}
          onOpen={() => {}}
          onClose={() => setIsOpenSideBarMobile(!isOpenSideBarMobile)}
          PaperProps={{
            sx: {
              width: drawerWidth,
            },
          }}
        >
          <Box p={2}>
            <SelectClients
              value={selectedClient?._id}
              onChange={(_, option: any) => handleSetClient(option?.['data-value'])}
              placeholder="Seleccione a un cliente"
              style={{ borderColor: selectedClient?._id ? undefined : 'red', width: '100%' }}
            />
          </Box>

          <Divider />

          {renderContentMobil}
        </SwipeableDrawer>
      </Box>

      <Box sx={{ display: { lg: 'block', xs: 'none' } }}>
        <Drawer
          open={isOpenSideBarDesktop}
          variant="persistent"
          anchor="left"
          PaperProps={{
            sx: {
              width: drawerWidth,
              zIndex: 2,
              bgcolor: 'background.paper',
            },
          }}
        >
          <Toolbar sx={{ height: '89px' }} />
          {renderContent}
        </Drawer>
      </Box>
    </>
  );
}
