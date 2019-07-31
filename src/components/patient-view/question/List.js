import React from 'react';
import Add from '@material-ui/icons/Add';
import Comment from '@material-ui/icons/Comment';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import MList from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { Retrieve } from '../../Retrieve';

const useStyles = makeStyles((theme) => ({
  add: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
}));

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
  const to = `${pageUrl}${id}/`;

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
  const { pageUrl, apiUrl } = props;
  const classes = useStyles();

  return (
    <>
      <MList>
        <Retrieve url={apiUrl} method="GET">
          <Item {...props} />
        </Retrieve>
      </MList>

      <Fab
        color="primary"
        aria-label="Add user"
        className={classes.add}
        component={Link}
        to={`${pageUrl}add/`}
      >
        <Add />
      </Fab>
    </>
  );
};

export { List };
