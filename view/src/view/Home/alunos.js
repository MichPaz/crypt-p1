import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import imgLeo from '../../images/leo.jpg';
import imgThat from '../../images/that.jpeg';
import imgGaybs from '../../images/gaybs.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));


const alunos = [
    {
        image: imgGaybs,
        name: 'Gabrielle Stephanie Pires Mestrinho',
        description: '1715080565',
    },
    {
        image: imgLeo,
        name: 'Leonardo Monteiro Neres de Lima',
        description: '1615080320',
    },
    {
        image: imgThat,
        name: 'Thatielen Oliveira Pereira',
        description: '1515080618',
    },
]

export default function FolderList() {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {alunos.map(aluno => (
                <ListItem key={aluno.name}>
                    <ListItemAvatar>
                        <Avatar src={aluno.image}/>
                    </ListItemAvatar>
                    <ListItemText primary={aluno.name} secondary={aluno.description} />
                </ListItem>
            ))}
        </List>
    );
}
