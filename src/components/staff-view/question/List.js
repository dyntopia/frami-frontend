import React from 'react';
import Comment from '@material-ui/icons/Comment';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import MList from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Retrieve } from '../../Retrieve';

const Answer = ({ answers, ...props }) => {
  const { t } = useTranslation();

  if (answers.length) {
    return (
      <IconButton aria-label={t('label.answer')} {...props}>
        <Comment />
      </IconButton>
    );
  }
  return null;
};

const Item = ({ data, pageUrl }) => {
  const { subject, answers, id } = data;
  const to = `${pageUrl}${id}`;

  return (
    <ListItem dense button component={Link} to={to}>
      <ListItemText primary={subject} />
      <ListItemSecondaryAction>
        <Answer answers={answers} component={Link} to={to} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const List = (props) => {
  const { apiUrl, uid } = props;

  return (
    <>
      <MList>
        <Retrieve url={`${apiUrl}?creator=${uid}`} method="GET">
          <Item {...props} />
        </Retrieve>
      </MList>
    </>
  );
};

export { List };
