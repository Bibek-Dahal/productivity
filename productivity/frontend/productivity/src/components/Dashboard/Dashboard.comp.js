
import {
    Analytics
} from '../'

function Dashboard({className}){
    return(
        <div
            className = {`${className ? className : ""}`}
        >
            <Analytics />
        </div>
    )
}

export default Dashboard;