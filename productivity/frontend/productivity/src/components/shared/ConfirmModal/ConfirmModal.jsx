
function ConfirmModal({setConfirmation,setConfirm}){
    return(
        <form action="" className = "confirmDeleteForm" onSubmit = {(e) => e.preventDefault()}>
            <h2>Remove task!</h2>
            <p>
                Are you sure you want to remove this task?
            </p>
            <div className="grid-btns">
                <button
                    className='canceldelete'
                    onClick = {() => setConfirmation(prev => !prev)}
                >
                    cancel
                </button>
                <button
                    className='confirmdelete'
                    onClick = {() => setConfirm(true)}
                >
                    confirm
                </button>
            </div>
        </form>
    )
}

export default ConfirmModal;