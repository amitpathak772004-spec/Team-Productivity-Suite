import api from './api';

export const fetchAdminDashboard = async () => {
  const response = await api.get('/dashboard/admin');
  return response.data.data;
};

export const fetchTeamLeadDashboard = async () => {
  const response = await api.get('/dashboard/teamlead');
  return response.data.data;
};

export const fetchEmployeeDashboard = async () => {
  const response = await api.get('/dashboard/employee');
  return response.data.data;
};
