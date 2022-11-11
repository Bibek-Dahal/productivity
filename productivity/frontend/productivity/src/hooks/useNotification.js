import {Store} from 'react-notifications-component';

function useNotification(){

    function createNotification(type,title,msg,time){
        Store.addNotification({
            title: title,
            message: msg,
            type: type,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: time,
              onScreen: true,
              pauseOnHover : true
            }
        });
    }


    return createNotification;
}

export default useNotification;