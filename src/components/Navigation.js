import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  drawer: {
    display: 'flex',
  },
  docked: {
    marginLeft: 180,
  },
  paper: {
    width: 180,
    [theme.breakpoints.up('sm')]: {
      top: 64,
    },
  },
  toggle: {
    position: 'fixed',
    top: 0,
    zIndex: theme.zIndex.appBar + 1,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

const Navigation = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const permanent = useMediaQuery(theme.breakpoints.up('sm'));
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav>
        <Drawer
          open={permanent || open}
          variant={permanent ? 'permanent' : 'temporary'}
          classes={{
            root: classes.root,
            docked: classes.docked,
            paper: classes.paper,
          }}
          onClose={() => setOpen(!open)}
        >
          {children}
        </Drawer>
      </nav>

      <IconButton
        aria-label="navigation"
        classes={{ root: classes.toggle }}
        onClick={() => setOpen(!open)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export { Navigation };
