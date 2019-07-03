import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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

const TopBar = ({ children }) => {
  const classes = useStyles();

  return (
    <AppBar classes={{ root: classes.appBar }}>
      <Toolbar>
        <div className={classes.flex} />
        {children}
      </Toolbar>
    </AppBar>
  );
};

export { TopBar };
