import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  paper: {
    flexGrow: 1,
  },
}));

const findSelected = (url, menus) => {
  const idx = menus.findIndex(([to]) => url.startsWith(to));
  return idx >= 0 ? idx : 0;
};

const Menu = (props) => {
  const { menus, match: { url } } = props;
  const [selected, setSelected] = useState(findSelected(url, menus));
  const classes = useStyles();
  const [,, Component] = menus[selected];

  return (
    <>
      <Paper square className={classes.paper}>
        <Tabs
          variant="fullWidth"
          value={selected}
          onChange={(e, value) => setSelected(value)}
        >
          {menus.map(([to, label]) => (
            <Tab key={to} label={label} component={Link} to={to} />
          ))}
        </Tabs>
      </Paper>
      <Component {...props} />
    </>
  );
};

export { Menu };
