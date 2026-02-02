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
    },
    setting: {
        manageTeams: 'setting/manage-teams'
    }
}