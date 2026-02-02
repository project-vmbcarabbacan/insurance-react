export type UserRole = 'admin' | 'manager' | 'agent' | 'support';

export type Permission =
    | 'view_dashboard'
    | 'view_sales'
    | 'view_reports'
    | 'view_customers'
    | 'manage_customers'
    | 'view_support'
    | 'view_settings';
