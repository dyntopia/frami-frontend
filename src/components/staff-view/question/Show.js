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

import { Retrieve } from '../../Retrieve';

const useStyles = makeStyles((theme) => ({
  add: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
}));

const Item = ({ data }) => {
  const { creator, subject, message } = data;

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{creator[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={subject || 'Answer'}
        secondary={
          <>
            <Typography component="span" color="textPrimary">
              {creator}
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
  const { qid, apiUrl, pageUrl } = props;
  const classes = useStyles();

  return (
    <>
      <Retrieve url={`${apiUrl}${qid}`}>
        <DataList {...props} />
      </Retrieve>

      <Fab
        color="primary"
        aria-label="Add user"
        className={classes.add}
        component={Link}
        to={`${pageUrl}${qid}/answer/`}
      >
        <Add />
      </Fab>
    </>
  );
};

export { Show };
