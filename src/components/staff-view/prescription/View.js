import React from 'react';

import { Form } from './Form';
import { List } from './List';

const View = (props) => {
  const { match: { params: { add, uid, mid } }, page } = props;
  const to = `/${page}/${uid}/prescription/`;

  if (mid) {
    return <Form uid={uid} pid={mid} to={to} {...props} />;
  }

  if (add) {
    return <Form to={to} {...props} />;
  }

  return <List {...props} />;
};

export { View };
