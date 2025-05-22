import {useEffect, useState} from "react";

const useOnlineStatus= ()=>{
    //  try checking online status and return online or offline

    const [onlineStatus, setOnlineStatus]=useState(true);

    useEffect(()=>{

        window.addEventListener("online",(event)=>{
            console.log('connected to internet');
            setOnlineStatus(true)

        });

        window.addEventListener("offline",((event)=>{
            console.log('disconnected from the internet');
            setOnlineStatus(false)
        }))
    },[])


    return onlineStatus;

}

export default useOnlineStatus;