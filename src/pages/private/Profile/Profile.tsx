import { Grid, Paper } from '@mui/material';
import Page from 'components/Page';

import { useState } from 'react';
import Configuration from './components/Configuration';
import MyInformation from './components/MyInformation';
import ProfileCard from './components/ProfileCard';

const Profile = () => {
  const [actualSection, setActualSection] = useState('informacion');

  const renderContent = () => {
    let jsxReturn = <></>;

    switch (actualSection) {
      case 'informacion':
        jsxReturn = <MyInformation />;
        break;
      case 'configuracion':
        jsxReturn = <Configuration />;
        break;
      default:
        break;
    }

    return jsxReturn;
  };

  return (
    <Page>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <ProfileCard actualSection={actualSection} setActualSection={setActualSection} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={4} sx={{ padding: '20px' }}>
            {renderContent()}
          </Paper>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Profile;
