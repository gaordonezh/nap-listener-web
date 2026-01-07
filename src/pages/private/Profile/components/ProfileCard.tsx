import { Avatar, Box, Chip, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Typography } from '@mui/material';
import { HomeOutlined, Settings } from '@mui/icons-material';
import { useAppContext } from 'context';

import './ProfileCard.css';

const ITEMS = [
  {
    icon: <HomeOutlined sx={{ color: 'grey.600' }} />,
    label: 'Mi Información',
    value: 'informacion',
  },
  {
    icon: <Settings sx={{ color: 'grey.600' }} />,
    label: 'Configuración de la cuenta',
    value: 'configuracion',
  },
];

interface IProps {
  actualSection: string;
  setActualSection: (section: string) => void;
}

const ProfileCard = ({ actualSection, setActualSection }: IProps) => {
  const { user } = useAppContext();

  return (
    <Paper elevation={4}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '10px',
          padding: '20px',
        }}
      >
        <Avatar sx={{ width: 200, height: 200 }} alt={user.name}></Avatar>
        <Typography variant="h4" sx={{ color: 'grey.600' }}>
          {user.name}
        </Typography>
        <Stack direction="row" spacing={1}>
          {user.roles.map((role) => (
            <Chip label={role.toUpperCase()} key={role} sx={{ backgroundColor: 'primary.main', color: '#fff', fontWeight: 'bold' }} />
          ))}
        </Stack>
      </Box>
      <List sx={{ width: '100%' }}>
        {ITEMS.map((item) => (
          <ListItem sx={{ padding: '0' }} key={item.value} id="btnProfile">
            <ListItemButton selected={actualSection === item.value} onClick={() => setActualSection(item.value)} sx={{ padding: '15px' }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ sx: { fontSize: '20px', color: 'grey.600' } }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ProfileCard;
