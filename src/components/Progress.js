import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Portal from '@material-ui/core/Portal';

const Progress = () => {
  return (
    <Portal>
      <Grid container justify="center">
        <CircularProgress />
      </Grid>
    </Portal>
  );
};

export { Progress };
