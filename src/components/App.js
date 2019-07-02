import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { useState } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import '../i18n';
import { Navigation } from './Navigation';
import { TopBar } from './TopBar';
import { Conditional } from './Conditional';
import { Routes } from './Routes';
import { Content } from './Content';

const App = ({ user: userObj }) => {
  const [user, setUser] = useState(userObj);
  const { t } = useTranslation();

  return (
    <BrowserRouter>
      <CssBaseline />
      <Box display="flex">
        <TopBar user={user} />
        <Conditional cond={user.id}>
          <Navigation>
            <List>
              <ListItem button component={Link} to="/">
                <ListItemText primary={t('label.home')} />
              </ListItem>

              <Conditional cond={user.is_staff}>
                <ListItem button component={Link} to="/patients/">
                  <ListItemText primary={t('label.patient', { count: 2 })} />
                </ListItem>
                <ListItem button component={Link} to="/staff/">
                  <ListItemText primary={t('label.staff', { count: 2 })} />
                </ListItem>
              </Conditional>
            </List>
          </Navigation>
        </Conditional>

        <Content toolbar>
          <Routes user={user} onLogin={setUser} />
        </Content>
      </Box>
    </BrowserRouter>
  );
};

export { App };
