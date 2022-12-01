const endpoints = {
    createGroup : `/api/group/create`,
    groupExists : `/api/group/group-exists`,
    getGroups : `/api/group/get-user-groups`,
    createTask : `/api/group/task/create`,
    retriveTasks : `/retrive/`,
    invitePeople : '/api/group/invite-member',
    getUserByEmail:'/api/find-user-by-email',
    getProfile:`/api/profile`,
    deleteGroup : `/api/group`,
    deleteTask : `/api/group/task/delete`,
    getTaskDetail : `/api/group/task/retrive`,
    deleteTask : `/api/group/task/delete`,
    updateTask : `/api/group/task/update`,
    updateProfile : `/api/profile/update`,
    getAllChats : `/api/group/chat/`,
    deleteGoal : `/api/group/task/goal/delete`,
    createGoal : `api/group/task/goal/create`,
    deleteProject : `/api/group/task/delete`
}

export default endpoints;