import React from 'react';

import { Form } from './Form';
import { List } from './List';
import { Show } from './Show';

const View = (props) => {
  const { match: { params: { action, mid } }, page, uid } = props;
  const pageUrl = `/${page}/${uid}/question/`;
  const apiUrl = '/api/question/';

  if (action) {
    return <Form {...props} qid={mid} pageUrl={pageUrl} apiUrl={apiUrl} />;
  }
  if (mid) {
    return <Show {...props} qid={mid} pageUrl={pageUrl} apiUrl={apiUrl} />;
  }
  return <List {...props} pageUrl={pageUrl} apiUrl={apiUrl} />;
};

export { View };
