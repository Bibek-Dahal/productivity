import React, { useEffect } from 'react';

import {
    useParams
} from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import endpoints from '../../utils/endpoints/otherEndpoints';

function ProjectDetail({groupId}){

    const axiosInstance = useAxios();

    const {projectId} = useParams();

    console.log('getting task',groupId)
    function getTask(){
        axiosInstance.get(`${endpoints.getTaskDetail}/${groupId}/${projectId}`)
            .then(res => {
                console.log('project = ',res);
            })
            .catch(err => {
                console.log('err',err)
            })
    }

    useEffect(() => {
        if(groupId){
            getTask();
        }
    },[projectId,groupId])

    return(
        <h1>
            project detail group = {groupId} project id = {projectId}
        </h1>
    )
}

export default ProjectDetail;