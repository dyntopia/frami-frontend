import React from 'react';
import Add from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { Conditional } from '../Conditional';
import { Retrieve } from '../Retrieve';
import { isStaff } from '../../utils';

const useStyles = makeStyles((theme) => ({
  add: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
}));

const Item = ({ data }) => {
  const { user, subject, message } = data;

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{user[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={subject || 'Answer'}
        secondary={
          <>
            <Typography component="span" color="textPrimary">
              {user}
            </Typography>
            {` - ${message}`}
          </>
        }
      />
    </ListItem>
  );
};

const DataList = ({ data }) => {
  const { answers } = data;

  return (
    <List>
      <Item key={data.id} data={data} />
      {answers.map((elt) => <Item key={elt.id} data={elt} />)}
    </List>
  );
};

const Show = (props) => {
  const { user, qid, page } = props;
  const classes = useStyles();

  return (
    <>
      <Retrieve url={`/api/question/${qid}`}>
        <DataList {...props} />
      </Retrieve>

      <Conditional cond={isStaff(user)}>
        <Fab
          color="primary"
          aria-label="Add user"
          className={classes.add}
          component={Link}
          to={`/${page}/${qid}/answer/`}
        >
          <Add />
        </Fab>
      </Conditional>
    </>
  );
};

export { Show };
