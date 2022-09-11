import React from 'react';
import { useEffect,useState } from 'react';
import { useAxios } from '../../hooks';
import endpoints from '../../utils/endpoints';
import './UserInfoSide.css';

const UserInfoSide = () =>{

    const axiosInstance = useAxios();

    const [user,setUser] = useState(null);

    const getUserInfo = async () => {
        try{
            const res = await axiosInstance.get(endpoints.getProfile);
            console.log(res);
            setUser(res.data.data);
        }catch(err){
            console.log(err);
        }
    }


    useEffect(() => {
        getUserInfo();
    },[])

    return(
        <div className = 'userinfoside'>
            <h2>
                Hey {user?.username}!
            </h2>
        </div>

    );
}

export default UserInfoSide;

