import React, { useState } from 'react';
import { CssBaseline, Container, Grid, Paper } from '@mui/material';
import Sidebar from './Components/Sidebar';
import AddPassengerForm from './page/AddPassengerForm';
import UpdateFlightStatusForm from './page/UpdateFlightStatusForm';

const App: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState('addPassenger');

  const renderContent = () => {
    switch (selectedSection) {
      case 'addPassenger':
        return <AddPassengerForm />;
      case 'updateFlightStatus':
        return <UpdateFlightStatusForm />;
      default:
        return <AddPassengerForm />;
    }
  };

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={10} md={2}>
            <Paper>
              <Sidebar onSelect={setSelectedSection} />
            </Paper>
          </Grid>
          <Grid item xs={10} md={9}>
            <Paper>
              {renderContent()}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
