import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import ExitToApp from '@material-ui/icons/ExitToApp';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import '../i18n';
import { Navigation, NavigationItem } from './navigation';
import { TopBar } from './TopBar';
import { Conditional } from './Conditional';
import { Routes } from './Routes';
import { Content } from './Content';
import { isPatient, isStaff } from '../utils';

const App = ({ user: userObj }) => {
  const [user, setUser] = useState(userObj);
  const { t } = useTranslation();

  return (
    <BrowserRouter>
      <CssBaseline />
      <Box display="flex">
        <TopBar>
          <Typography>{user && user.username}</Typography>
          <IconButton
            color="inherit"
            aria-label={t('label.logout')}
            component={Link}
            to="/logout/"
          >
            {user && user.id && <ExitToApp />}
          </IconButton>
        </TopBar>

        <Conditional cond={user.id}>
          <Navigation>
            <NavigationItem to="/" label="home" />

            <Conditional cond={isStaff(user)}>
              <NavigationItem to="/patient/" label="patient" plural />
              <NavigationItem to="/staff/" label="staff" plural />
            </Conditional>

            <Conditional cond={isPatient(user)}>
              <NavigationItem
                to={`/prescription/${user.id}/`}
                label="prescription"
                plural
              />
              <NavigationItem to="/result/" label="test_result" plural />
            </Conditional>

            <NavigationItem to="/question/" label="question" plural />
            <NavigationItem to="/appointment/" label="appointment" plural />
            <NavigationItem
              to="/appointment-request/"
              label="appointment_request"
              plural
            />
            <NavigationItem to="/notification/" label="notification" plural />
          </Navigation>
        </Conditional>

        <Content toolbar>
          <Routes user={user} onLogin={setUser} onLogout={setUser} />
        </Content>
      </Box>
    </BrowserRouter>
  );
};

export { App };
