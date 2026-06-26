import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '../services/taskApi';

const useTasksData = (page = 1, limit = 12, filters = {}) => {
  return useQuery({
    queryKey: ['tasks', page, limit, filters],
    queryFn: () => fetchTasks({ page, limit, ...filters }),
    placeholderData: (previousData) => previousData,
  });
};

export default useTasksData;
