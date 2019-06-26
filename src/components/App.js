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

const App = () => {
  const [user, setUser] = useState(window.user || {});
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
