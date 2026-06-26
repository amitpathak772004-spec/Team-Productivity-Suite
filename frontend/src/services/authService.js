import api from './api';

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data.data;
};

export const register = async (payload) => {
  const response = await api.post('/auth/register', payload);
  return response.data.data;
};

export const getProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data.data;
};
