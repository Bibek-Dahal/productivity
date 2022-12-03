function GroupActivity({className}){
    return(
        <div
           className = {
            `
                ${className ? className : ""}
            `
           }
        >
            <p>
                group activity
            </p>
        </div>
    )
}

export default GroupActivity;