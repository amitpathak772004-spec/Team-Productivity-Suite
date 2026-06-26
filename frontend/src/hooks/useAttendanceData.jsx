import { useQuery } from '@tanstack/react-query';
import { fetchMonthlyAttendance } from '../services/attendanceService';

const useAttendanceData = (month, year) => {
  return useQuery({
    queryKey: ['attendance', month, year],
    queryFn: () => fetchMonthlyAttendance(month, year),
    enabled: !!month && !!year,
  });
};

export default useAttendanceData;
