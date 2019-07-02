import React from 'react';

import { Form as UserForm } from '../user';

const Form = ({ uid, page }) => {
  return <UserForm isStaff uid={uid} to={`/${page}/`} />;
};

export { Form };
