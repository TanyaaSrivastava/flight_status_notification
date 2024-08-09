import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Alert } from '@mui/material';
import { updateFlightStatus } from '../services/apiService';

const flightNumbers = ["AA123", "BA456", "CA789", "DA012", "EA345", "FA678",
    "GA901", "HA234", "IA567", "JA890", "KA123", "LA456",
    "MA789", "NA012", "OA345", "PA678", "QA901", "RA234",
    "SA567", "TA890"];
const statuses = ["On Time", "Delayed", "Cancelled", "Gate Change"];

const UpdateFlightStatusForm: React.FC = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFlightNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlightNumber(e.target.value);
};

const handleStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await updateFlightStatus({ flightNumber, status });
      setSuccess('Flight status updated successfully');
      setFlightNumber('');
      setStatus('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error updating flight status');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
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
      <TextField
        select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        fullWidth
        margin="normal"
        required
      >
        {statuses.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="outlined" color="success">
        Update Status
      </Button>
    </Box>
  );
};

export default UpdateFlightStatusForm;
