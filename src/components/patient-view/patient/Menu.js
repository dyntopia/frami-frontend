import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
          {menus.map(([to, name]) => (
            <Tab key={to} label={t(`label.${name}`)} component={Link} to={to} />
          ))}
        </Tabs>
      </Paper>
      <Component {...props} />
    </>
  );
};

export { Menu };
