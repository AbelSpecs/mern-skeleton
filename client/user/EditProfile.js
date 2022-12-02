import { set, update } from "lodash";
import { useEffect, useState } from "react";
import auth from "../auth/auth-helper";
import { read } from "./api-user";

export default function EditProfile({ match }) {
    const [user, setUser] = useState({});
    const [redirectToSigin, setRedirectToSignin] = useState(false);
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        redirectToProfile: false
    });
    
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const jwt = auth.isAuthenticated();

        read({
            params: { userId: match.params.userId },
            credentials: { divineMole: jwt.token },
            signal
        }).then(data => {
            if(data && data.error)
                setRedirectToSignin(true);
            else
                setUser(data);
        });

        return function cleanup() {
            abortController.abort();
        } 
    }, [match.params.userId]);

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;

        setValues({...values, [name]: value});
    }

    const clickSubmit = () => {
        const user = {
            name: values.name | undefined,
            email: values.email | undefined,
            password: values.password | undefined
        }

        update({
            params: { userId: match.params.userId },
            credentials: { divineMole: jwt.token },
            user
        }).then(data => {
            if(data && data.error)
                // setRedirectToSignin(true);
                setValues({...values, error: data.error});
            else
                setValues({...values, redirectToProfile: true});
        })
    }

    if(redirectToSigin)
        return (<redirect to='/signin'/>)

    if(values.redirectToProfile)
        return (<redirect to={'/user/' + match.params.userId}/>)
    
    return(
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography>
                        Edit Profile
                    </Typography>
                    <TextField id="name" label="Name" className={classes.textField}
                                value={values.name || user.name} onChange={handleChange('name')}
                                margin="normal"/>
                    <br/>
                    <TextField id="email" type="email" label="Email" className={classes.textField}
                                value={values.email || user.email} onChange={handleChange('email')}
                                margin="normal"/>
                    <br/>
                    <TextField id="pwd" type="password" label="Password" className={classes.textField}
                                value={values.password} onChange={handleChange('password')}
                                margin="normal"/>
                    <br/>
                    {
                        values.error && (<Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>error</Icon>
                            {values.error}</Typography>)
                    }
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained"
                        onClick={clickSubmit} className={classes.submit}>
                        Submit   
                    </Button>
                </CardActions>
            </Card>
        </div>
    )    
}