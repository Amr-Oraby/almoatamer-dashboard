import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from './api';
import { DashboardResponse } from './types';

export function useDashboardStats() {
  return useQuery<DashboardResponse>({
    queryKey: ['dashboard_stats'],
    queryFn: async () => await getDashboardStats(),
  });
}
