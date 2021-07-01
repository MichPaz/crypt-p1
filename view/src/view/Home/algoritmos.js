import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { options } from '../../main/algorithms'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));


export default function FolderList() {
    const classes = useStyles();
    const history = useHistory()

    const handleClick = (value) => () => {
        history.push(`?informacao=${value}`)
    }

    return (
        <List className={classes.root}>
            {options.map(option => (
                <ListItem key={option.value} button onClick={handleClick(option.value)}>
                    <ListItemAvatar>
                        <Avatar><ListAltIcon /></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={option.label} secondary={option.description} />
                </ListItem>
            ))}
        </List>
    );
}
