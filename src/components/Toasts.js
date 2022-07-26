import {toast} from "react-toastify";

const timeOut = 1500;

const options = {
    toastId: "1",position: "top-right",
    autoClose: timeOut,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
};

function successToast(message){
    toast.success(message, options);
}

function infoToast(message){
    toast.info(message, options);
}

function errorToast(message){
    toast.error(message, options);
}

function warningToast(message) {
    toast.warn(message, options);
}

export {successToast, infoToast, warningToast, errorToast};