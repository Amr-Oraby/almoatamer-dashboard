export interface StatisticsData {
    experience_years: number;
    prizes: number;
}

export interface StatisticsResponse {
    status: string;
    message: string;
    data: StatisticsData;
}

export interface StatisticsUpdateRequest {
    experience_years: number;
    prizes: number;
}

export interface StatisticsUpdateResponse {
    status: string;
    message: string;
    data: null;
}
