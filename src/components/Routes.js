import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Ipsum } from './Ipsum';
import { Login } from './Login';
import { View as PatientView } from './patient';
import { View as StaffView } from './staff';

const Routes = ({ user, onLogin }) => {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            user.id ?
              <Ipsum {...props} /> :
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
          path="/patient/:uid(\d+)?/"
          render={(props) => <PatientView {...props} page="patient" />}
        />
        <Route
          exact
          path="/patient/:add/"
          render={(props) => <PatientView {...props} page="patient" />}
        />
        <Route
          exact
          path="/staff/:uid(\d+)?/"
          render={(props) => <StaffView {...props} page="staff" />}
        />
        <Route
          exact
          path="/staff/:add/"
          render={(props) => <StaffView {...props} page="staff" />}
        />
      </Switch>
    </>
  );
};

export { Routes };
