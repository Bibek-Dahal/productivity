import React,{useEffect,useState,useRef} from 'react'
import {TextField,FormControlLabel,Checkbox, Button,Avatar} from '@mui/material'
import useAxios from '../../hooks/useAxios';
import endpoints from '../../utils/endpoints/otherEndpoints';
import './ProfileUpdate.css';
import { Icon } from '@iconify/react';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/system';


function ProfileUpdate({userProfile,setProfile,getProfile,toggle}) {

    const [profile,setUserProfile] = useState(null)
    const [submitting,setSubmitting] = useState(false);

    const axiosInstance = useAxios();

    // temp
    const [items,setItems] = useState([]);
    const [currentItem,setCurrentItem] = useState("");
    const [avatar,setAvatar] = useState(null);
    const [avatarFile,setAvatarFile] = useState(null);

    const addItem = (e) => {
        if(e.keyCode == "13"){
            e.preventDefault();
            setItems(prev => ([
                ...prev,
                currentItem
            ]))
        }
    }

    const update = (e) => {
        e.preventDefault();
        setUserProfile(prev => ({
            ...prev,
            skills : items
        }))
        setSubmitting(true);
    }

    const deleteItem = (e) => {
        setItems(prev => (
            prev.filter(p => p !== e.target.getAttribute('value'))
        ))
    }


    useEffect(() => {
        if(profile && submitting){
            let data = {
                username : profile.username,
                skills : profile.skills
            }

            console.log('avatarFile',avatarFile)

            if(avatarFile) {
                data = {
                    ...data,
                    avatar : avatarFile
                }
            }

            let form_data = new FormData();

            for ( let key in data ) {
                if(key !== "skills"){
                    form_data.append(key, data[key]);
                }
            }

           if(data.skills.length > 0){
            
                for(let skill in data["skills"]){
                    form_data.append('skills',data["skills"][skill]);
                }
           }else{
            console.log('setting ')
            form_data.append('skills',[0,4]);
           }
            
            console.log('submitting',form_data)
            axiosInstance.put(`${endpoints.updateProfile}`,form_data)
                .then(res => {
                    setSubmitting(false);
                    console.log('res = ',res);
                    getProfile();
                    toggle();
                })
                .catch(err => {
                    setSubmitting(false);
                    console.log('err = ',err)
                });
        }
    },[profile])


    const changeHandler = (e) => {
        console.log('changed',e.target.value);
        setUserProfile(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    useEffect(() => {
      if(userProfile){
        setUserProfile(userProfile);
        setItems(userProfile.skills)
        setAvatar(userProfile.avatar ? userProfile.avatar : null)
      }
    },[userProfile])

    return (
        <div className = "profile-update-container">
            <h2>Update Profile</h2>
            {
                profile &&
                    <form action="" onSubmit={update}>
                        {
                            !(profile?.avatar || avatar) ?
                                <Avatar 
                                    sx = {{
                                        width : "100px",
                                        height : "100px",
                                        marginLeft : "auto",
                                        marginRight : "auto"
                                    }}
                                    icon = {<Icon icon = "carbon:user-avatar-filled" />}
                                />:<div className='profile-image'>
                                    {
                                        avatar ?
                                        <img src={avatar} alt="" />:
                                        <img src={profile?.avatar} alt="" />
                                    }
                                </div>
                        }
                        <Button
                            variant="outlined"
                            component="label"
                            onChange = {(e) => {
                                console.log(e.target.files[0])
                                setAvatarFile(e.target.files[0]);
                                const reader = new FileReader();

                                reader.addEventListener("load", () => {
                                    const uploaded_image = reader.result;
                                    console.log('uploaded image = ',uploaded_image)
                                    setAvatar(uploaded_image);
                                });
                                reader.readAsDataURL(e.target.files[0]);
                                // setUserProfile(prev => ({
                                //     ...prev,
                                //     avatar : e.target.files[0]
                                // }))
                            }}
                        >
                            change Profile Image
                            <input
                                type="file"
                                hidden
                                accept = "image/png,image/jpg"
                            />
                        </Button>
                        <TextField 
                            label="username" 
                            variant="outlined"
                            fullWidth
                            value = {profile?.username} 
                            onChange = {changeHandler}
                            name = "username"
                            disabled
                        />
                        <TextField 
                            label="email" 
                            variant="outlined"
                            fullWidth
                            value = {profile?.email} 
                            name = "email"
                            onChange = {changeHandler}
                            disabled
                        />
                        <div className="multiple-input-field skills">
                            <TextField 
                                label="skills" 
                                variant="outlined"
                                fullWidth
                                onKeyDown = {addItem}
                                onChange = {(e) => setCurrentItem(prev => e.target.value)}
                            />
                            <div className="skills-container removable">
                                {
                                    items.map(item => (
                                        <li
                                            key = {item}
                                            className = "item"
                                        >{item}
                                            <span 
                                                className="deleteIcon"
                                                onClick = {deleteItem}
                                                value = {item}
                                            >
                                                <Icon icon = "ic:outline-delete" />
                                            </span>
                                        </li>
                                    ))
                                }
                            </div>
                        </div>
                        <FormControlLabel 
                            control={
                                <Checkbox defaultChecked = {profile.is_active ? true : false} 
                                name = "is_active" 
                                // onChange = {(e) => setProfile(prev => ({...prev,[e.target.name] : e.target.checked}))}
                                disabled = {true}
                            />} 
                            label="Account active" 
                        />
                        {
                            submitting ?
                                <LoadingButton
                                    loading
                                    variant = "outlined"
                                    loadingPosition="end"
                                    >
                                    Submitting
                                </LoadingButton>:
                                <Button
                                    type = "submit"
                                    size = "lg"
                                    variant = "contained"
                                >
                                    Update
                                </Button>
                        }
                    </form>
            }
        </div>
    )
}

export default ProfileUpdate