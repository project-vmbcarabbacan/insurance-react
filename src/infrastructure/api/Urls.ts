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
        activity: {
            get: 'lead/activity',
            add: 'lead/activity/add',
        },
        leads: 'lead/leads',
    },
    setting: {
        manageTeams: 'setting/manage/teams',
        manageCustomers: 'setting/manage/customers',
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
        }
    }
}