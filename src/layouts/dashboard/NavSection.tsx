import { useState } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// ----------------------------------------------------------------------

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ListItemStyle = styled((props: any) => <ListItemButton disableGutters {...props} />)(
  ({ theme, isactive }: { theme: any; isactive: boolean }) => ({
    ...theme.typography.body2,
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    borderRadius: '8px',

    color: isactive ? `${theme.palette.primary.main} !important` : `${theme.palette.text.secondary} !important`,
    background: isactive ? `${alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)} !important` : undefined,
    fontWeight: isactive ? 'bold' : undefined,

    '&:hover': {
      color: theme.palette.text.secondary,
    },
  })
);

// ----------------------------------------------------------------------
interface IProps {
  item: any;
}

function NavItem({ item }: IProps) {
  const { title, path, icon: Icon, children } = item;

  const { pathname } = useLocation();
  const match = (path: string) => path === pathname;

  const isActiveRoot = match(path) || children?.some((child: any) => match(child.path));

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => setOpen((prev: any) => !prev);

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    return (
      <>
        <ListItemStyle isactive={isActiveRoot} onClick={handleOpen}>
          {Icon && (
            <ListItemIconStyle>
              <Icon />
            </ListItemIconStyle>
          )}
          <ListItemText disableTypography primary={title} />
          <Box sx={{ width: 16, height: 16, ml: 1, display: 'flex', alignItems: 'center' }}>
            <ArrowDropDownIcon />
          </Box>
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item: any) => {
              const { title, path, icon: Icon } = item;
              const isActiveSub = match(path);

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle
                    sx={{
                      marginLeft: 2,
                      ...(isActiveSub && {
                        color: 'primary.main',
                      }),
                    }}
                  >
                    {Icon ? (
                      <Icon />
                    ) : (
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          display: 'flex',
                          borderRadius: '50%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'text.disabled',
                          transition: (theme) => theme.transitions.create('transform'),
                          ...(isActiveSub && {
                            transform: 'scale(2)',
                            bgcolor: 'primary.main',
                          }),
                        }}
                      />
                    )}
                  </ListItemIconStyle>
                  <ListItemText
                    disableTypography
                    primary={title}
                    sx={{
                      ...(isActiveSub && {
                        color: 'primary.main',
                      }),
                    }}
                  />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle component={RouterLink} to={path} isactive={isActiveRoot}>
      {Icon && (
        <ListItemIconStyle>
          <Icon />
        </ListItemIconStyle>
      )}
      <ListItemText disableTypography primary={title} />
    </ListItemStyle>
  );
}

interface IPropsNavSection {
  navConfig: Array<any>;
}

export default function NavSection({ navConfig, ...other }: IPropsNavSection) {
  return (
    <Box {...other} sx={{ padding: '0 15px' }}>
      <List sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {navConfig.map((item: any) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}
