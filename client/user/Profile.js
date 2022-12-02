import { IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { read } from "./api-user";
import auth from "../auth/auth-helper";

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
      maxWidth: 600,
      margin: 'auto',
      padding: theme.spacing(3),
      marginTop: theme.spacing(5)
    }),
    title: {
      marginTop: theme.spacing(3),
      color: theme.palette.protectedTitle
    }
  }))

export default function Profile({ match }) {
    const classes = useStyles();
    const [user, setUser] = useState({});
    const [redirectToSigin, setRedirectToSignin] = useState(false);

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

    if(redirectToSigin)
        return (<redirect to='/signin'/>)

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                Profile
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email}/>
                    { auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id
                        &&
                        (<ListItemSecondaryAction>
                                <Link to={"/user/edit/" + user._id}>
                                    <IconButton aria-label="Edit" color="primary"><Edit/></IconButton>
                                </Link>
                                <DeleteUser userId={user._id}/>
                            </ListItemSecondaryAction>)
                    }
                    
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText primary={"Joined: " + (new Date(user.created)).toDateString()}/>
                </ListItem>
            </List>
        </Paper>
    )
}