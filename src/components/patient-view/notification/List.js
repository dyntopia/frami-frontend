import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import MList from '@material-ui/core/List';
import _ from 'lodash/fp';
import { useTranslation } from 'react-i18next';

import { Message } from '../../Message';
import { Progress } from '../../Progress';
import { useRequest } from '../../../hooks';

const Item = ({ data }) => {
  const { t } = useTranslation();
  const { user, group, event, target, target_name: name } = data;
  const subject = t(`message.${name}_${event}_subject`, target);
  const message = t(`message.${name}_${event}_message`, target);

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{(user || group)[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={subject} secondary={message} />
    </ListItem>
  );
};

const List = () => {
  const [message, setMessage] = useState(true);
  const [userState, userRequest] = useRequest();
  const [groupState, groupRequest] = useRequest();
  const { t } = useTranslation();

  if (!userState.started && !groupState.started) {
    userRequest('get', '/api/user-notification/');
    groupRequest('get', '/api/group-notification/');
    return <Progress />;
  }

  if (userState.loading || groupState.loading) {
    return <Progress />;
  }

  if (userState.error || groupState.error) {
    return (
      <Message
        open={message}
        type="error"
        text={t('message.apiError')}
        onClose={() => setMessage(false)}
      />
    );
  }

  const data = _.unionBy('uuid', userState.data, groupState.data);
  return (
    <MList>
      {data.map((elt) => <Item key={elt.uuid} data={elt} />)}
    </MList>
  );
};

export { List };
