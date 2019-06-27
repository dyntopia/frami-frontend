import React from 'react';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Close from '@material-ui/icons/Close';
import Error from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import Portal from '@material-ui/core/Portal';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const icons = {
  success: CheckCircle,
  error: Error,
};

const useStyles = makeStyles((theme) => ({
  success: {
    background: green[600],
  },
  error: {
    background: theme.palette.error.dark,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Message = ({ text, type, open, onClose }) => {
  const classes = useStyles();
  const Icon = icons[type];
  const anchor = { vertical: 'bottom', horizontal: 'center' };

  return (
    <Portal>
      <Snackbar open={open} anchor={anchor}>
        <SnackbarContent
          className={classes[type]}
          action={
            <IconButton aria-label="close" color="inherit" onClick={onClose}>
              <Close />
            </IconButton>
          }
          message={
            <span className={classes.message}>
              <Icon className={classes.icon} />
              {text}
            </span>
          }
        />
      </Snackbar>
    </Portal>
  );
};

export { Message };
