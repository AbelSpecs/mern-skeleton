import { create } from "lodash";
import { useState } from "react";

export default function Signup() {
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
    });

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;

        setValues({...values, [name]: value});
    }

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }

        create(user).then((data) => {
            if(data.error){
                setValues({...values, error: data.error});
            }
            else{
                setValues({...values, error: '', open: true});
            }
        });
    }

    return (
        <div>
            
        </div>
    )
} 