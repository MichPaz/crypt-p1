import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListAltIcon from '@material-ui/icons/ListAlt';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export const options = [
    {
        value: 'des',
        label: 'DES',
        description: 'Data Encryption Standart'
    },
    {
        value: 'aes',
        label: 'AES',
        description: 'Advanced Encryption Standard'
    },
    {
        value: 'blowfish',
        label: 'Blowfish',
        description: ''
    },
    {
        value: 'twofish',
        label: 'Twofish',
        description: ''
    },
    {
        value: '3des',
        label: '3DES',
        description: 'Triple Data Encryption Standard'
    },
    {
        value: 'idea',
        label: 'IDEA',
        description: 'International Data Encryption Algorithm'
    },
]

export default function FolderList() {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {options.map(option => (
                <ListItem key={option.value}>
                    <ListItemAvatar>
                        <Avatar><ListAltIcon /></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={option.label} secondary={option.description} />
                </ListItem>
            ))}
        </List>
    );
}
