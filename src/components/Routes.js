import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Ipsum } from './Ipsum';
import { Login } from './Login';
import { Logout } from './Logout';
import { View as PatientView } from './patient';
import { View as PrescriptionView } from './prescription';
import { View as ResultView } from './result';
import { View as QuestionView } from './question';
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
          path="/logout/"
          render={(props) => (
            <Logout {...props} onSuccess={onLogout} />
          )}
        />
        <Route
          exact
          path="/prescription/:uid(\d+)/"
          render={(props) => (
            <PrescriptionView {...props} user={user} page="prescription" />
          )}
        />
        <Route
          exact
          path="/result/:rid(\d+)?/"
          render={(props) => (
            <ResultView {...props} user={user} page="result" />
          )}
        />

        <Route
          exact
          path="/question/:qid(\d+)?/:action?/"
          render={(props) => (
            <QuestionView {...props} user={user} page="question" />
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
          path="/patient/:uid(\d+)/:menu?/:mid(\d+)?"
          render={(props) => (
            <PatientView {...props} user={user} page="patient" />
          )}
        />
        <Route
          exact
          path="/patient/:uid(\d+)/:menu?/:add/"
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
      </Switch>
    </>
  );
};

export { Routes };
