import { useState } from "react";
import { redirect } from "react-router";
import { signin } from "../auth/api-auth";
import auth from "../auth/auth-helper";

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2)
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing(2)
    }
}));

export default function SignIn() {
    const classes = useStyles();
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    });

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;

        setValues({...values, [name]: value});
    }

    const clickSubmit = () => {
        const user = {
            email: values.email | undefined,
            password: values.password | undefined
        }

        signin(user).then(data => {
            if(data.error)
                setValues({...values, error: data.error});
            else    
                auth.authenticate(data, () => {
                    setValues({...values, error: '', redirectToReferrer: true})
                })
        });

        const {from} = props.location.state || {
            from: {
                pathname: '/'
            }
        }

        const {redirectToReferrer} = values
        if (redirectToReferrer) 
            return (<redirect to={from}/>)
    }

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography>
                        Sign In
                    </Typography>
                    <TextField id="email" type="email" label="Email" className={classes.textField}
                                value={values.email} onChange={handleChange('email')}
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