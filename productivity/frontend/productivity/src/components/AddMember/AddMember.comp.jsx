import React,{useState} from "react";

import {InputField} from '../shared/';

import './AddMember.comp.css';

import useAxios from "../../hooks/useAxios";
import endpoints from "../../utils/endpoints/otherEndpoints";

import {Store} from 'react-notifications-component';
import { Icon } from "@iconify/react";

function AddMember({toggle,group_name}){

    // const [data,setData] = useState({
    //     email : [],
    //     group_name : ""
    // })

    const [emails,setEmails] = useState([])

    const axiosInstance = useAxios();

    const [people,setPeople] = useState([]);
    const [addedPeople,setAddedPeople] = useState([]);

     function addEmail(e){
        console.log('added people',JSON.parse(e.target.getAttribute('info')));
        const info = JSON.parse(e.target.getAttribute('info'))
        setAddedPeople(prev => (
            [
                ...prev,
                info
            ]
        ))
        setEmails(prev => (
            [
               ...prev,
               info.email
            ]
        ))
        setPeople([])
        Store.addNotification({
            title: "Successfull!",
            message: `${info.username} added successfully`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
              pauseOnHover : true
            }
        });
        // setPeople(prev => (
        //     [
        //         ...prev,
        //         JSON.parse(e.target.getAttribute("info"))
        //     ]
        // ))
    }
    
    function onChangeHandler(e){
        if(e.target.value == ""){
            setPeople([]);
            return;
        }
        console.log(e.target.value);
        axiosInstance.get(`${endpoints.getUserByEmail}/${e.target.value}`)
            .then(res => {
                setPeople(res.data?.user)
                console.log(res)
            })
            .catch(err => console.log(err))
    }


    function removePeople(e){
        const usernameToDelete = e.target.getAttribute('username')
        setAddedPeople(prev => {
            return prev.filter(p => p.username !== usernameToDelete);
        })
        setEmails(prev => (prev.filter(p => p.username !== usernameToDelete)))
    }   

    function invitePeople(){
        console.log('inviting',emails)
        axiosInstance.post(`${endpoints.invitePeople}`,{
            email : emails,
            group_name : group_name
        })
            .then(res => {
                console.log(res);
                Store.addNotification({
                    title: "Successfull!",
                    message: `invitation sent successfully`,
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true,
                      pauseOnHover : true
                    }
                });
                toggle();
            })
            .catch(err => {
                console.log('error occured',err);
            })
    }


    return(
        <div className="addmember-container">
            <input type="text" placeholder = "username to search" onChange={onChangeHandler}/>
                
                    {/* <div 
                // data.email.length !== 0 &&
                        className="people"
                        onClick = {addEmail}
                    >
                        <img src="https://picsum.photos/200" alt="" />
                        <div className="info">
                            <span className="name">
                                ram
                            </span>
                            <span className="email">
                                ram@gmail.com
                            </span>
                        </div>
                    </div> */}

                    {
                        people.length != 0 &&
                            <>
                                <div className="search-result-container">
                                {
                                    people.map(p => (
                                        <div 
                                            className="people"
                                            onClick = {addEmail}
                                            info = {JSON.stringify(p)}
                                        >
                                            <img src="https://picsum.photos/200" alt="" />
                                            <div className="info">
                                                <span className="name">
                                                    {p.username}
                                                </span>
                                                <span className="email">
                                                    {p.email}
                                                </span>
                                            </div>
                                            
                                        </div> 
                                    ))
                                }
                            </div>
                            </>
                    }
                {/* <div className="people">
                    <img src="https://picsum.photos/200" alt="" />
                    <div className="info">
                        <span className="name">
                            ram
                        </span>
                        <span className="email">
                            ram@gmail.com
                        </span>
                    </div>
                </div> */}

            {
                        addedPeople.length != 0 &&
                            <>
                                <div className="peoples-container">
                                {
                                    addedPeople.map(p => (
                                        <div className="people">
                                            <img src="https://picsum.photos/200" alt="" />
                                            <div className="info">
                                                <span className="name">
                                                    {p.username}
                                                </span>
                                                <span className="email">
                                                    {p.email}
                                                </span>
                                            </div>
                                            <div username = {p.username} className="delete-people-icon" onClick = {removePeople}>
                                                <Icon icon = "fluent-emoji-high-contrast:cross-mark" />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            </>
                    }
                    <button
                        onClick = {invitePeople}
                    >
                        invite all above people
                    </button>
        </div>
    )
}


export default AddMember;