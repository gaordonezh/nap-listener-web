import { type PropsWithChildren, type ReactElement, useEffect } from 'react';
import { Breadcrumbs, Grid, Slide, Typography, styled, Link as MuiLink } from '@mui/material';
import PROJECT_CONFIG from 'config/project.config';
import { Link, useLocation } from 'react-router-dom';
import sidebarConfig from 'layouts/dashboard/SidebarConfig';
import { Apps } from '@mui/icons-material';

const PageWrapper = styled('main')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '10px',
  padding: '10px 20px',
}));

// ----------------------------------------------------------------------
type IDirection = 'up' | 'down' | 'left' | 'right';
const types: IDirection[] = ['down', 'left', 'right', 'up'];

interface IProps {
  component?: ReactElement;
  title?: string;
}

const CustomScrollBar = styled('div')(({ theme }) => ({
  '&::-webkit-scrollbar': {
    width: 5,
    height: 5,
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.primary.dark,
    borderRadius: 5,
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: theme.palette.primary.main,
  },
  '&::-webkit-scrollbar-thumb:active': {
    backgroundColor: theme.palette.primary.light,
  },
  '&::-webkit-scrollbar-track': {
    background: '#BBB',
    borderRadius: 5,
  },
  '&::-webkit-scrollbar-track:hover': {
    background: '#AAA',
  },
  '&::-webkit-scrollbar-track:active': {
    background: '#CCC',
  },
}));

/**
 * Componente para renderizar páginas
 *
 * @param children - Contenido de la página
 * @param title - Título de la página (Opcional)
 * @return ReactElement
 */
const Page = ({ children, component, title }: PropsWithChildren<IProps>): ReactElement => {
  const location = useLocation();

  const { Icon, group, module } = sidebarConfig.reduce(
    (acum, next) => {
      const isSimilar = next.path === location.pathname;
      if (isSimilar) {
        // acum.group = next.title;
        acum.module = next.title;
        acum.Icon = next.icon;
      }
      return acum;
    },
    { group: '', module: '', Icon: Apps }
  );

  useEffect(() => {
    document.title = (module ? module + ' | ' : '') + PROJECT_CONFIG.NAME;
  }, []);

  return (
    <Slide in={true} timeout={500} appear direction={types[Math.floor(Math.random() * 4)]}>
      <PageWrapper>
        <Grid container spacing={1.5} justifyContent="space-between" alignItems="center" component="main">
          <Grid>
            <Breadcrumbs>
              <MuiLink underline="hover" component={Link} color="inherit" to="/" sx={{ display: 'flex', alignItems: 'center' }}>
                <Apps sx={{ mr: 0.5 }} fontSize="inherit" />
                Dashboard
              </MuiLink>
              {group ? <Typography color="inherit">{group}</Typography> : null}
              {module ? (
                <Typography sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}>
                  <Icon sx={{ mr: 0.5 }} fontSize="inherit" />
                  {module}
                </Typography>
              ) : null}
            </Breadcrumbs>

            <Typography
              mt={1}
              variant="h4"
              fontWeight={700}
              sx={{
                borderLeft: '5px solid',
                borderBottom: '1px solid',
                borderColor: 'primary.main',
                borderBottomLeftRadius: 8,
                pl: 1,
                pr: 5,
                pb: 0.5,
              }}
            >
              {module || title || 'Modulo no definido'}
            </Typography>
          </Grid>
          {component && <Grid>{component}</Grid>}
          <Grid size={12}>
            <CustomScrollBar sx={{ overflowY: 'auto', paddingRight: '2px', height: 'calc((100vh) - 220px)' }}>{children}</CustomScrollBar>
          </Grid>
        </Grid>
      </PageWrapper>
    </Slide>
  );
};

export default Page;
