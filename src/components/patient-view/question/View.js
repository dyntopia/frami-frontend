import React from 'react';

import { Form } from './Form';
import { List } from './List';
import { Show } from './Show';

const View = (props) => {
  const { match: { params: { action, qid } }, page } = props;
  const pageUrl = `/${page}/`;
  const apiUrl = '/api/question/';

  if (action) {
    return <Form {...props} qid={qid} pageUrl={pageUrl} apiUrl={apiUrl} />;
  }
  if (qid) {
    return <Show {...props} qid={qid} pageUrl={pageUrl} apiUrl={apiUrl} />;
  }
  return <List {...props} qid={qid} pageUrl={pageUrl} apiUrl={apiUrl} />;
};

export { View };
