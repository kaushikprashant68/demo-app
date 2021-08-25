import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function MediaCard(props) {
    const classes = useStyles();

    const onDeleteUser = (name) => {
        let { allUsers = [] } = props;
        let filterdUsers = allUsers.length && allUsers.filter(item => item.name !== name);
        window.localStorage.setItem('users', JSON.stringify(filterdUsers));
        props.updatedUsers(filterdUsers);
    }

    const { userData = [], openEditModal = () => { } } = props;
    const { name = '', email = '', address = '' } = userData;

    return (
        <Card className={`${classes.root} cus-card-listing`}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name || ""}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Email : {email || ''}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Address : {address || ''}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className="action-btn">
                <Button size="small" color="primary">
                    <div className="d-flex" onClick={() => openEditModal(userData)}><span>Edit</span><EditIcon /></div>
                </Button>
                <Button size="small" color="primary">
                    <div className="d-flex" onClick={() => onDeleteUser(name)}><span>Delete</span><DeleteForeverIcon /></div>
                </Button>
            </CardActions>
        </Card>
    );
}