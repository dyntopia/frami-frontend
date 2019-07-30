import React from 'react';

import { Form } from './Form';
import { List } from './List';

const View = (props) => {
  const { match: { params: { action, aid } }, page } = props;
  const to = `/${page}/`;

  if (action || aid) {
    return <Form {...props} aid={aid} to={to} />;
  }
  return <List {...props} />;
};

export { View };
