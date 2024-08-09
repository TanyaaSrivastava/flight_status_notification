import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Alert } from '@mui/material';
import { addPassenger } from '../services/apiService';

const flightNumbers = ["AA123", "BA456", "CA789", "DA012", "EA345", "FA678",
    "GA901", "HA234", "IA567", "JA890", "KA123", "LA456",
    "MA789", "NA012", "OA345", "PA678", "QA901", "RA234",
    "SA567", "TA890"];

const AddPassengerForm: React.FC = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
  }
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
        type="email"
      />
      <TextField
        select
        label="Flight Number"
        value={flightNumber}
        onChange={(e) => setFlightNumber(e.target.value)}
        fullWidth
        margin="normal"
        required
      >
   {flightNumbers.map((flight) => (
          <MenuItem key={flight} value={flight}>
            {flight}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" color="success">
        Add Passenger
      </Button>
    </Box>
  );
};

export default AddPassengerForm;
