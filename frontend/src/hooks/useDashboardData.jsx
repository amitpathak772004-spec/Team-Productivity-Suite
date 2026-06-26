import { useQuery } from '@tanstack/react-query';
import { fetchEmployeeDashboard, fetchAdminDashboard, fetchTeamLeadDashboard } from '../services/dashboardService';
import { useAuth } from '../context/AuthContext';

const useDashboardData = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['dashboard', user?.role],
    queryFn: async () => {
      if (user?.role === 'ADMIN') {
        return fetchAdminDashboard();
      }
      if (user?.role === 'TEAM_LEAD') {
        return fetchTeamLeadDashboard();
      }
      return fetchEmployeeDashboard();
    },
    enabled: !!user,
  });
};

export default useDashboardData;
