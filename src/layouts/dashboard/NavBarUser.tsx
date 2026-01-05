import { useState } from 'react';
// Material
import {
  Avatar,
  Box,
  ClickAwayListener,
  Divider,
  Grow,
  MenuItem,
  styled,
  Tooltip,
  tooltipClasses,
  type TooltipProps,
  Typography,
} from '@mui/material';

// Icons
// import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

// Context
import { Person } from '@mui/icons-material';
import { useAppContext } from 'context';
import { useNavigate } from 'react-router-dom';
import StorageService from 'services/storageService';
import PROJECT_CONFIG from 'config/project.config';

const CustomToolTip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    // backgroundColor: '#fff',
    // color: 'rgba(0, 0, 0, 0.87)',
    width: 200,
    fontSize: theme.typography.pxToRem(14),
  },
}));

const NavBarUser = ({ width = 50, height = 50 }: { width?: number; height?: number }) => {
  const { user } = useAppContext();
  const name = user?.f_name ? user?.f_name[0] : 'X';

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(!isOpen);
  const handleOpenAway = () => setIsOpen(false);

  return (
    <ClickAwayListener onClickAway={handleOpenAway}>
      <div>
        <CustomToolTip
          TransitionComponent={Grow}
          TransitionProps={{ timeout: 250 }}
          placement="bottom-start"
          disableFocusListener
          disableHoverListener
          disableTouchListener
          open={isOpen}
          title={<ToolTipContent handleOpenAway={handleOpenAway} />}
          PopperProps={{
            sx: { '.MuiTooltip-tooltip': { padding: '0 !important' } },
          }}
        >
          <Avatar
            src={user?.profile_picture}
            onClick={handleOpen}
            sx={{
              transition: 'all 0.3s ease-in-out',
              width,
              height,
              '&:hover': { cursor: 'pointer', transform: 'scale(1.05)' },
            }}
          >
            {name}
          </Avatar>
        </CustomToolTip>
      </div>
    </ClickAwayListener>
  );
};

const ToolTipContent = ({ handleOpenAway }: { handleOpenAway: Function }) => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const Logout = () => {
    handleOpenAway();

    StorageService.delete(PROJECT_CONFIG.LOCAL_AUTH);
    navigate('/login');
  };

  const TOOLTIP_OPTIONS = [
    {
      title: 'Mi perfil',
      icon: <Person />,
      action: () => {
        navigate('/dashboard/profile');
        handleOpenAway();
      },
    },
    {
      title: 'Cerrar sesión',
      icon: <LogoutIcon />,
      action: Logout,
    },
  ];

  return (
    <Box sx={{ padding: '10px 0' }}>
      <Box sx={{ padding: '0 20px', paddingBottom: '10px' }}>
        <Typography variant="subtitle1">{user?.f_name + ' ' + user.l_name}</Typography>
        <Typography component="div" variant="caption">
          {user?.roles?.[0].toUpperCase()}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ padding: '5px 15px' }}>
        {TOOLTIP_OPTIONS.map(({ title, icon, action }, index) => (
          <MenuItem
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: '10px',
              borderRadius: '5px',
            }}
            onClick={action}
            key={title}
          >
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', gap: '10px' }}>
              {icon}
              <Typography
                variant="subtitle2"
                sx={{
                  width: '100%',
                  textAlign: 'start',
                  marginLeft: '5px',
                }}
              >
                {title}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Box>
    </Box>
  );
};

export default NavBarUser;
