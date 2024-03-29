import { 
    Button, 
    Card, 
    CardActions, 
    CardContent, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Icon, 
    TextField, 
    Typography 
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { create } from "./api-user";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import React from "react";

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

export default function Signup() {
    const classes = useStyles();
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
    });

    const handleChange = name => event => {
        let value = event.target.value;

        setValues({...values, [name]: value});
    }

    const handleClose = () => {
        setValues({...values, open: false});
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
                setValues({...values, error: '', name: '', password: '', email: '', open: true});
            }
        });
    }

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography>
                        Sign Up
                    </Typography>
                    <TextField id="name" label="Name" className={classes.textField}
                                value={values.name} onChange={handleChange('name')}
                                margin="normal"/>
                    <br/>
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
            <Dialog open={values.open} onClose={handleClose}>
                <DialogTitle>New Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        New account successfully created
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/signin">
                        <Button color="primary" autoFocus="autoFocus"
                                variant="contained">
                            Sign In
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    )
} 