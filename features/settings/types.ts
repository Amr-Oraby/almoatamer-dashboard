export interface SettingData {
    id: number;
    key: string;
    value: string | number;
    created_at: string | null;
    updated_at: string | null;
}

export interface SettingsResponse {
    status: string;
    message: string;
    data: SettingData[];
}

export interface SettingUpdateRequest {
    setting_id: number;
    key: string;
    value: string | number;
}

export interface SettingUpdateResponse {
    status: string;
    message: string;
    data: any;
}
