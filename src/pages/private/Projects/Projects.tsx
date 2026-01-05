import { Alert, Button, Typography } from '@mui/material';
import Page from 'components/Page';

export default function Projects() {
  return (
    <Page component={<Button variant="contained">AGREGAR</Button>}>
      <Alert severity="info">Selecciona un proyecto para ver sus detalles y artículos.</Alert>

      <Typography>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt, aspernatur id vitae tenetur saepe nostrum quia quod totam iure deleniti quas
        tempore velit libero. Temporibus tenetur fugit deleniti sapiente consequuntur.
      </Typography>
    </Page>
  );
}
