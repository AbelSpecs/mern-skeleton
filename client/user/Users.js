import React from "react";
import { 
    Avatar, 
    IconButton, 
    List, 
    ListItem, 
    ListItemAvatar, 
    ListItemSecondaryAction, 
    ListItemText, 
    Paper, 
    Typography 
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { list } from "./api-user";
import { Link } from "react-router-dom";
import { ArrowForward } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Person from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
        margin: theme.spacing(4),
    },
    title: {
      margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
      color: theme.palette.openTitle
    },
    textDecoration: {
        textDecoration: 'none'
    }
    
}));

export default function Users() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        list(signal).then((data) => {
            if(data && data.error) {
                console.log(data.error)
            }else {
                console.log(data);
                setUsers(data);
            }
        });

        return function cleanup(){
            abortController.abort();
        }
    }, []);


    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                All Users
            </Typography>
            <List dense>
                {users.map((item, i) => {
                    return <Link to={"/user/" + item._id} key={i} className={classes.textDecoration}>
                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Person/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={item.name}/>
                                    <ListItemSecondaryAction>
                                        <IconButton>
                                            <ArrowForward/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </Link>
                })}
            </List>
        </Paper>
    )
}


