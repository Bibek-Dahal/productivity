function PersonalActivity({className}){
    return(
        <div
           className = {
            `
                ${className ? className : ""}
            `
           }
        >
            <p>
                personal activity
            </p>
        </div>
    )
}

export default PersonalActivity;