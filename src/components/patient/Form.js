import React from 'react';

import { Form as UserForm } from '../user';

const Form = ({ id, page }) => {
  return <UserForm id={id} to={`/${page}/`} />;
};

export { Form };
