import React from 'react';
import Delete from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
}));

const Remove = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Fab
      color="secondary"
      aria-label={t('remove')}
      className={classes.fab}
      {...props}
    >
      <Delete />
    </Fab>
  );
};

export { Remove };
