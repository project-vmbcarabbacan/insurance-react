export const API_URL = {
    csrf: 'sanctum/csrf-cookie',
    auth: {
        login: 'authentication/spa/login',
        logout: 'authentication/spa/logout'
    },
    user: {
        current: 'user/current-loggedin',
        teams: 'user/teams',
        teamStatus: 'user/teams/update/status',
        password: 'user/teams/password',
        accessed: 'user/teams/assign/product',
        assignAccessed: 'user/teams/upsert/product'
    },
    setting: {
        manageTeams: 'setting/manage-teams',
        insuranceProduct: 'setting/insurance-product',
    }
}