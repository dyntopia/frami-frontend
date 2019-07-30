import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NavigationItem = (props) => {
  const { to, label, plural } = props;
  const { t } = useTranslation();
  const text = t(`label.${label}`, { count: plural ? 2 : 1 });

  return (
    <ListItem button component={Link} to={to}>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export { NavigationItem };
