import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Login } from '../Login';

const Routes = ({ user, onLogin }) => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Redirect to="/login/" />}
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
  );
};

export { Routes };
