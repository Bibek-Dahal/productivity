import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

function PrivateRoute({children}){
    
    const {user} = useAuthContext();

    const navigate = useNavigate();

    if(!user) navigate('/login');

    return(
            {
                ...children
            }
    )
}

export default PrivateRoute;