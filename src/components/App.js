import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import ExitToApp from '@material-ui/icons/ExitToApp';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import '../i18n';
import { TopBar } from './TopBar';
import { Content } from './Content';
import { isPatient, isStaff } from '../utils';
import {
  Navigation as StaffNavigation,
  Routes as StaffRoutes,
} from './staff-view';
import {
  Navigation as PatientNavigation,
  Routes as PatientRoutes,
} from './patient-view';
import {
  Navigation as AnonymousNavigation,
  Routes as AnonymousRoutes,
} from './anonymous-view';

const getComponents = (user) => {
  if (isStaff(user)) {
    return [StaffNavigation, StaffRoutes];
  } else if (isPatient(user)) {
    return [PatientNavigation, PatientRoutes];
  }
  return [AnonymousNavigation, AnonymousRoutes];
};

const App = ({ user: userObj }) => {
  const [user, setUser] = useState(userObj);
  const [Navigation, Routes] = getComponents(user);
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

        <Navigation user={user} />

        <Content toolbar>
          <Routes user={user} onLogin={setUser} onLogout={setUser} />
        </Content>
      </Box>
    </BrowserRouter>
  );
};

export { App };
