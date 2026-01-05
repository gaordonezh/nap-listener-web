import { Typography, styled, Toolbar, AppBar, Box } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import NavBarUser from './NavBarUser';
import { Menu } from 'assets/icons';
import { useLayoutContext } from 'context/layout';
import { SquareButton } from 'ui-components/Button';
import PROJECT_CONFIG from 'config/project.config';

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  height: '80px',
  maxHeight: '80px',
  borderBottom: `1px solid ${theme.palette.divider}`,
  justifyContent: 'center',
  color: theme.palette.text.primary,
  backdropFilter: 'blur(6px)',
  background: theme.palette.background.default,
  boxShadow: 'none',
  zIndex: 3,
}));

export default function DashboardNavbar() {
  const { isOpenSideBarDesktop, setIsOpenSideBarDesktop, isOpenSideBarMobile, setIsOpenSideBarMobile, mode, toggleMode } = useLayoutContext();

  const handleClick = () => {
    setIsOpenSideBarDesktop(!isOpenSideBarDesktop);
    setIsOpenSideBarMobile(!isOpenSideBarMobile);
  };

  return (
    <CustomAppBar>
      <Toolbar>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <SquareButton onClick={handleClick} sx={{ display: { lg: 'none', xs: 'flex' } }}>
              <Menu />
            </SquareButton>

            <Typography variant="h6" display={{ lg: 'block', xs: 'none' }}>
              {PROJECT_CONFIG.NAME}
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                v{PROJECT_CONFIG.VERSION}
              </Typography>
            </Typography>
          </Box>

          <Box width={500} display={{ lg: 'block', xs: 'none' }}>
            SELECT EMPRESAS 2
          </Box>

          <Box sx={{ display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center' }}>
            <SquareButton onClick={() => toggleMode()}>{mode === 'light' ? <DarkMode /> : <LightMode />}</SquareButton>

            <NavBarUser width={50} height={50} />
          </Box>
        </Box>
      </Toolbar>
    </CustomAppBar>
  );
}
