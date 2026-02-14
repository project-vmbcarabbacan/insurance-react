export const API_URL = {
    csrf: 'sanctum/csrf-cookie',
    auth: {
        login: 'authentication/spa/login',
        logout: 'authentication/spa/logout'
    },
    user: {
        current: 'user/current/loggedin',
        teams: 'user/teams',
        teamStatus: 'user/teams/update/status',
        password: 'user/teams/password',
        accessed: 'user/teams/assign/product',
        assignAccessed: 'user/teams/upsert/product'
    },
    customer: {
        customers: 'customers/search',
        addCustomer: 'customers/store',
        updateCustomer: 'customers/update',
        patchCustomer: 'customers/patch',
        details: 'customers/details'
    },
    lead: {
        vehicle: {
            store: 'lead/vehicle/store',
            view: 'lead/vehicle/view',
            find: 'lead/vehicle/find'
        },
        health: {
            store: 'lead/health/store',
            view: 'lead/health/view',
            find: 'lead/health/find'

        },
        activity: 'lead/activity/add',
        leads: 'lead/leads',
    },
    setting: {
        manage: {
            teams: 'setting/manage/teams',
            customers: 'setting/manage/customers',
            plans: 'setting/manage/plans',
        },
        insuranceProduct: 'setting/insurance/product',
        upsertCustomer: 'setting/customer/upsert',
        detailCustomer: 'setting/customer/details',
        leadActivity: 'setting/lead/activity',
        vehicle: {
            prerequisites: 'setting/vehicle/prerequisites',
            make: 'setting/vehicle/make',
            model: 'setting/vehicle/model',
            trim: 'setting/vehicle/trim',
        },
        health: {
            prerequisites: 'setting/health/prerequisites',
        },
        provider: {
            pagination: 'setting/providers/paginate',
            search: 'setting/providers/search',
            store: 'setting/providers/store',
            update: 'setting/providers/update',
            status: 'setting/providers/status',
            active: 'setting/providers/active',
        },
        plan: {
            pagination: 'setting/plans/paginate',
            updatePlan: 'setting/plans/search/update',
            addPlan: 'setting/plans/search/add',
            store: 'setting/plans/store',
            update: 'setting/plans/update',
            status: 'setting/plans/status',
            active: 'setting/plans/active',
        }
    }
}