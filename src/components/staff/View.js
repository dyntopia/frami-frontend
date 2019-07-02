import React from 'react';

import { Form } from './Form';
import { List } from './List';

const View = (props) => {
  const { match: { params: { action } } } = props;

  if (action) {
    const id = parseInt(action, 10);
    return <Form {...props} id={id || null} />;
  }

  return <List {...props} />;
};

export { View };
