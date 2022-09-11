import React,{
    useState
} from 'react';
import './InvitePeople.css';

import {
    InputField
} from '../index';

import { Icon } from '@iconify/react';
import endpoints from '../../utils/endpoints';
import {
    useAxios
} from '../../hooks/index';
import { toast } from 'react-toastify';

const InvitePeople = ({setShowInvitePeople,groupId,group}) =>{

    const [emails,setEmails] = useState([]);
    const [currentEmail,setCurrentEmail] = useState("");
    const axiosInstance = useAxios();

    const changeHandler = async (e) => {
        setCurrentEmail(e.target.value);
    }

    // const keypresshandler = (e) => {
    //     if(e.charCode == 13){
    //         e.preventDefault()
    //         console.log(currentEmail);
    //         setEmails(prev => (
    //             [
    //                 currentEmail,
    //                 ...prev
    //             ]
    //         ))
    //         setCurrentEmail("");
    //     }
    // }

    const removeEmail = (e) => {
        console.log(e.target)
        const selectedEmail = e.target.getAttribute("email");
        console.log(selectedEmail)
        setEmails(prev => {
            return(prev.filter(email => email != selectedEmail ))
        })
    }

    const invitePeopleHandler = async () => {
        console.log('inviting people',emails);
        // try{
        //     const res = await axiosInstance.post(endpoints.invitePeople,{
        //         email : emails[0],
        //         group_name : group.name 
        //     });
        //     console.log(res);
        //     setShowInvitePeople(false);
        //     toast.success(res.data.message);
        // }catch(err){
        //     console.log(err);
        // }
    
    }   

    const findPerson = async (e) => {
        console.log('finding ',currentEmail);
        try{
            console.log(e.target)
            const res = await axiosInstance.post(endpoints.getUserByEmail,{
                email : currentEmail
            });
            console.log(res);
            if(!emails.includes(res.data.user.email)){
                setEmails(prev => (
                    [
                        ...prev,
                        res.data.user.email
                    ]
                ))
            }
            setCurrentEmail("");
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className = 'invitepeople'>
            <div 
                className="close-btn"
                onClick={() => setShowInvitePeople(false)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="none" role="img" class="icon fill-current">
                    <path d="M8.28596 6.51819C7.7978 6.03003 7.00634 6.03003 6.51819 6.51819C6.03003 7.00634 6.03003 7.7978 6.51819 8.28596L11.2322 13L6.51819 17.714C6.03003 18.2022 6.03003 18.9937 6.51819 19.4818C7.00634 19.97 7.7978 19.97 8.28596 19.4818L13 14.7678L17.714 19.4818C18.2022 19.97 18.9937 19.97 19.4818 19.4818C19.97 18.9937 19.97 18.2022 19.4818 17.714L14.7678 13L19.4818 8.28596C19.97 7.7978 19.97 7.00634 19.4818 6.51819C18.9937 6.03003 18.2022 6.03003 17.714 6.51819L13 11.2322L8.28596 6.51819Z" fill="currentColor"></path>
                </svg>
            </div>
            <div className="top">
                <h1>
                    Invite People
                </h1>
                <p>
                    Enter all emails separated by comma
                </p>
            </div>
            <div className="main">
                <InputField 
                    name = "emails"
                    label = "Emails to invite"
                    icon = "fluent:mail-20-filled"
                    onChange={changeHandler}
                    type = "text"
                    value = {currentEmail}
                />
                {/* <button
                    onClick = {invitePeopleHandler}
                >
                    Invite all
                </button> */}
                <button
                    onClick = {findPerson}
                >
                    find person
                </button>
            </div>
           
            <div className="emails-list-container">
                {
                    emails.map((email,id) => (
                        <div 
                            key = {id}
                            className="email" 
                        >
                            <small>
                                {email}
                            </small>
                            <div 
                                onClick = {removeEmail}
                                className="cross"
                                email = {email}
                            >
                                <Icon icon = "ep:close-bold" />
                            </div>
                        </div>
                    ))
                }
            </div>
            {
                emails.length > 0 &&
                    <div className = "invite-btn">
                        <button
                            onClick = {invitePeopleHandler}
                        >
                            invite all
                        </button>
                    </div>
            }
            
        </div>
    );
}

export default InvitePeople;

