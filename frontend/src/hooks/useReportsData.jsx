import { useQuery } from '@tanstack/react-query';
import { fetchReports } from '../services/reportApi';

const useReportsData = () => {
  return useQuery({
    queryKey: ['reports'],
    queryFn: fetchReports,
  });
};

export default useReportsData;
