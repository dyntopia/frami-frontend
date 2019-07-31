import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { Retrieve } from '../../Retrieve';

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
  const { qid, apiUrl } = props;

  return (
    <Retrieve url={`${apiUrl}${qid}/`}>
      <DataList {...props} />
    </Retrieve>
  );
};

export { Show };
