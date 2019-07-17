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

import { Conditional } from '../Conditional';
import { Retrieve } from '../Retrieve';
import { isPatient } from '../../utils';

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

const Item = ({ data, page }) => {
  const { subject, answers, id } = data;
  const to = `/${page}/${id}/`;

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
  const { user, page } = props;
  const classes = useStyles();

  return (
    <>
      <MList>
        <Retrieve url="/api/question/" method="GET">
          <Item {...props} />
        </Retrieve>
      </MList>

      <Conditional cond={isPatient(user)}>
        <Fab
          color="primary"
          aria-label="Add user"
          className={classes.add}
          component={Link}
          to={`/${page}/add/`}
        >
          <Add />
        </Fab>
      </Conditional>
    </>
  );
};

export { List };
