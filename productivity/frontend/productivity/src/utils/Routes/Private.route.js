import { useEffect } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

function PrivateRoute({children}){
    
    const {user} = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
    },[user])

    const location = useLocation();
    console.log('inside private route')

    if(!user) {
        return <Navigate to = "/login" state = {{from : location}}/>
    }

    return(
        {...children}
    )
}

export default PrivateRoute;