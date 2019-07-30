import React from 'react';

import { Form } from './Form';
import { List } from './List';

const View = (props) => {
  const { match: { params: { add, uid } } } = props;

  if (uid) {
    return <Form {...props} uid={uid} />;
  }

  if (add) {
    return <Form {...props} />;
  }

  return <List {...props} />;
};

export { View };
