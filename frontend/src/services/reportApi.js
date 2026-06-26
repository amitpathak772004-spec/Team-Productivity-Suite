import api from './api';

export const fetchReports = async () => {
  const response = await api.get('/reports');
  return response.data.data;
};

export const submitReport = async (payload) => {
  const response = await api.post('/reports', payload);
  return response.data.data;
};
