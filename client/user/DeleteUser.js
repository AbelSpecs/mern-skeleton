import { useState } from "react";
import auth from "../auth/auth-helper";
import { remove } from "./api-user";

export default function DeleteUser({userId}) {
    const [values, setValues] = useState({
        open: false,
        redirect: false
    });

    const clickButton = () => {
        setValues({...values, open: true});
    }

    const handleClose = () =>{
        setValues({...values, open: false});
    }

    const confirmDelete = () =>{
        const jwt = auth.isAuthenticated();
        
        remove({
            params: userId,
            credentials: { divineMole: jwt.token }
        }).then(data => {
            if(data && data.error) 
                console.log(data.error);
            else{
                auth.clearJWT(() => console.log('deleted'));
                setValues({...values, redirect: true});
            }

        })
    }
}