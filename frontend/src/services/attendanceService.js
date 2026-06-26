import api from './api';

export const fetchMonthlyAttendance = async (month, year) => {
  const response = await api.get('/attendance/monthly', {
    params: { month, year },
  });
  return response.data.data;
};

export const checkIn = async () => {
  const response = await api.post('/attendance/checkin');
  return response.data.data;
};

export const checkOut = async () => {
  const response = await api.post('/attendance/checkout');
  return response.data.data;
};

export const breakIn = async () => {
  const response = await api.post('/attendance/breakin');
  return response.data.data;
};

export const breakOut = async () => {
  const response = await api.post('/attendance/breakout');
  return response.data.data;
};
