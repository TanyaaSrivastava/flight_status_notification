import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // Update this to your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const addPassenger = async (data: { name: string; mobile: string; email: string; flightNumber: string; date: Number }) => {
  return apiClient.post('/addPassenger', data);
};

export const updateFlightStatus = async (data: { flightNumber: string; status: string }) => {
  return apiClient.put('/updateFlightStatus', data);
};
