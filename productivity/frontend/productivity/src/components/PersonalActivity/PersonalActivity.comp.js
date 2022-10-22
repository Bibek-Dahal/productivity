function PersonalActivity({className}){
    return(
        <div
           className = {
            `
                ${className ? className : ""}
            `
           }
        >
            personal activity
        </div>
    )
}

export default PersonalActivity;