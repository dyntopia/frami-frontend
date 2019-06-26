import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    padding: theme.spacing(3),
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
}));

const Content = ({ children, toolbar }) => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      {toolbar && <div className={classes.toolbar} />}
      {children}
    </main>
  );
};

export { Content };
