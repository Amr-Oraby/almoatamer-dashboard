export interface DeletionAudit {
    id: number;
    deleted_user_id: number;
    deleted_user_name: string;
    deleted_user_email: string;
    deleted_user_phone: string;
    deleted_user_status: string;
    deleted_user_is_active: boolean;
    deleted_user_accepted_by_admin: boolean;
    deletion_type: string;
    deletion_source: string;
    deletion_method: string;
    request_url: string;
    request_method: string;
    request_ip: string;
    user_agent: string;
    triggered_by_user_id: number;
    triggered_by_user_name: string;
    triggered_by_user_role: string;
    is_console: boolean;
    is_queue: boolean;
    console_command: string | null;
    queue_job: string | null;
    related_records_deleted: Record<string, number> | null;
    cascade_trigger_table: string | null;
    cascade_trigger_id: string | null;
    stack_trace: any[] | null;
    additional_data: {
        user_gender?: string;
        user_locale?: string;
        user_country_id?: number;
        user_created_at?: string;
    } | null;
    deleted_at: string;
    created_at: string;
    updated_at: string;
}

export interface DeletionAuditsResponse {
    status: string;
    message: string;
    data: {
        current_page: number;
        data: DeletionAudit[];
        first_page_url: string;
        from: number | null;
        last_page: number;
        last_page_url: string;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number | null;
        total: number;
    }
}

export interface SingleDeletionAuditResponse {
    status: string;
    message: string;
    data: DeletionAudit;
}
