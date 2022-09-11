
export const baseURL = 'http://127.0.0.1:8000'

const endpoints = {
    register : '/api/register',
    login : '/api/login',
    getGroups : '/api/group/get-user-groups',
    createGroup : '/api/group/create',
    getGroupDetail : '/api/group',
    groupExists :'/api/group/group-exists',
    resendEmailVerification : '/api/register/resend-email',
    invitePeople : '/api/group/invite-member',
    getProfile : '/api/profile',
    getUserByEmail:'/api/find-user-by-email'
}

export default endpoints;
