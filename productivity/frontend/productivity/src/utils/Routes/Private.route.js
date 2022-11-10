import { useEffect } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

function PrivateRoute({children}){
    
    const {user} = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        console.log('inside private route')
    },[])

    const location = useLocation();

    if(!user) {
        console.log('naviagting to login');
        return <Navigate to = "/login" state = {{from : location}}/>
    }

    return(
        {...children}
    )
}

export default PrivateRoute;