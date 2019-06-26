import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  appBar: {
    boxShadow: 'none',
    justifyContent: 'flex-end',
  },
  flex: {
    flexGrow: 1,
  },
}));

const TopBar = ({ user }) => {
  const classes = useStyles();

  return (
    <AppBar classes={{ root: classes.appBar }}>
      <Toolbar>
        <div className={classes.flex} />
        <Typography>{user && user.username}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export { TopBar };
