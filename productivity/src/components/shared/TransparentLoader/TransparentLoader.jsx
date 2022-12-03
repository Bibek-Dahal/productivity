import {Icon} from '@iconify/react';

function TransparentLoader({icon,className}){
    return(
       <div
            style = {{
                position : "fixed",
                height : "100vh",
                width : "100vw",
                top : "0",
                left : "0",
                background : "rgba(0,0,0,.5)"
            }}
       >
            <Icon 
                icon = {icon}
                className = {className}
            />
       </div>
    )
}

export default TransparentLoader;