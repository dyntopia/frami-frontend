import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Ipsum } from './Ipsum';
import { Login } from './Login';

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
      </Switch>
    </>
  );
};

export { Routes };
