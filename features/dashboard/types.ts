export interface DashboardStat {
  id: number;
  route: string;
  key: string;
  title: string;
  count: number;
}

export interface DashboardResponse {
  status: string;
  data: DashboardStat[];
  message: string;
}
