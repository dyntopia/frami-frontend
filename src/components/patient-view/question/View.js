import React from 'react';

import { Form } from './Form';
import { List } from './List';
import { Show } from './Show';

const View = (props) => {
  const { match: { params: { action, qid } } } = props;

  if (action) {
    return <Form {...props} qid={qid} />;
  }
  if (qid) {
    return <Show {...props} qid={qid} />;
  }
  return <List {...props} />;
};

export { View };
