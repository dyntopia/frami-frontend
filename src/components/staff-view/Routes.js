import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Home } from '../Home';
import { Login } from '../Login';
import { Logout } from '../Logout';
import { View as AppointmentRequestView } from './appointment-request';
import { View as AppointmentView } from './appointment';
import { View as NotificationView } from './notification';
import { View as PatientView } from './patient';
import { View as StaffView } from './staff';

const Routes = ({ user, onLogin, onLogout }) => {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            user.id ?
              <Home {...props} user={user} /> :
              <Redirect to="/login/" />
          )}
        />
        <Route
          exact
          path="/login/"
          render={(props) => (
            user.id ?
              <Redirect to="/" /> :
              <Login {...props} onSuccess={onLogin} />
          )}
        />
        <Route
          exact
          path="/logout/"
          render={(props) => (
            <Logout {...props} onSuccess={onLogout} />
          )}
        />
        <Route
          exact
          path="/appointment/:aid(\d+)?/:action?/"
          render={(props) => (
            <AppointmentView {...props} user={user} page="appointment" />
          )}
        />
        <Route
          exact
          path="/appointment-request/:aid(\d+)?/:action?/"
          render={(props) => (
            <AppointmentRequestView
              {...props}
              user={user}
              page="appointment-request"
            />
          )}
        />
        <Route
          exact
          path="/patient/:uid(\d+)?/"
          render={(props) => (
            <PatientView {...props} user={user} page="patient" />
          )}
        />
        <Route
          exact
          path="/patient/:uid(\d+)/:menu?/:mid(\d+)?/:action?/"
          render={(props) => (
            <PatientView {...props} user={user} page="patient" />
          )}
        />
        <Route
          exact
          path="/patient/:add/"
          render={(props) => (
            <PatientView {...props} user={user} page="patient" />
          )}
        />
        <Route
          exact
          path="/staff/:uid(\d+)?/"
          render={(props) => (
            <StaffView {...props} user={user} page="staff" />
          )}
        />
        <Route
          exact
          path="/staff/:add/"
          render={(props) => (
            <StaffView {...props} user={user} page="staff" />
          )}
        />
        <Route
          exact
          path="/notification/"
          render={(props) => (
            <NotificationView {...props} user={user} page="notification" />
          )}
        />
      </Switch>
    </>
  );
};

export { Routes };
