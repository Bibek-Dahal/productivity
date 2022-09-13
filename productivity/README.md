## Installation Guide For Node
 ```
 move to directory backend
 add .env in backend directory
 install packages -> npm install
 run project -> npm run dev

 ```

 ## Installation Guide For React
 ```
 move to directory frontend/productivity
 install packages -> npm install
 run project -> npm start

 ```

# Auth Routes

## 1. Register
    data = {
            "username": "",
            "email": "",
            "password": "",
            "repeat_password": "",
            "skills": "<Array>"
    }
    axios.post('http://127.0.0.1:8000/api/register',data)

## 2. Login
    data = {
            "email": "",
            "password": "",
    }
    axios.post('/api/login',data)

## 3. Password Change
    data = {
            "old_password": "",
            "new_password": "",
            "repeat_password": ""
    }

    options = {
        headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${access_token}`}
    }
    axios.post('/api/password-change',data,options)

## 4. Password Reset email

    data = {
        "email": ""
    }

    axios.post('/api/password-reset',data)

## 5. Reset Password
    
    data = {
        "new_password": "",
        "repeat_password": ""
    }

    axios.post('/api/password-reset/<userId>/<token>',data)

## 6. Verify User
    axios.post('/api/user/<userId>/verify/<token>')

## 7. Resend Verification email
    data = {
        "email": ""
    }

    axios.post('/api/register/resend-email',data)

# Profile

# 1. Get User Profile
    options = {
        headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${access_token}`}
    }

    axios.get('/api/profile',options)
    

## Update User Profile

    data = {
        "username": "",
        "skills": "",
        "avatar": "<optional>"
    }
    options = {
        headers:{ 'Content-Type':'multipart/form-data','Authorization':`Bearer ${access_token}`}
    }

    axios.put('/api/profile/update',data,options)
    
    updates profile picture too if avatar is present


# Group

## 1. Create Group
    data = {
        "name":"",
        "title":"",
        "description":"",
        
    }

    options = {
        headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${access_token}`}
    }

    axios.post('/api/group/create',data,options)

## 2. Retrive Group
    options = {
        headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${access_token}`}
    }

    axios.get('/api/group/<groupId>/retrive',options)

## 3. Update Group

    data = {
        "name": "",
        "members": "<array>",
        "description": ""
    }

    options = {
        headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${access_token}`}
    }

    axios.put('api/group/<groupId>/update',data,options)


# 4. Delete Group

    options = {
        headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${access_token}`}
    }

    axios.delete('api/group/<groupId>/delete',options)

# 5. List All Groups User Belongs To

    options = {
        headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${access_token}`}
    }

    axios.get('api/group/get-user-groups',options)

# 6. Invite Member To Group

    data = {
        "email": "",
        "group_name": ""
    }
     options = {
        headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${access_token}`}
    }

    axios.post('/api/group/invite-member',data,options)

# 7. Join Group From Link Received Through email

    axios.post('api/group/<groupName>/join/<token>')

# 8. Chekck If Group Exists

    data = {
        "name": ""
    }
    axios.post('/api/group/group-exists',data)

# 9. Get Group Members Details
    options = {
        headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${access_token}`}
    }
    axios.get('/api/group/members-details/<groupId>',options)

# 10 . Find User By email

    options = {
        headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${access_token}`}
    }

    axios.get('/api/find-user-by-email/<email>',options)












 
    
