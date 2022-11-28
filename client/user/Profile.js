import { ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@material-ui/core";
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
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText primary={"Joined: " + (new Date(user.created)).toDateString()}/>
                </ListItem>
            </List>
        </Paper>
    )
}