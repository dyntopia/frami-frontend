import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Field, Form as MForm } from '../form';
import { Conditional } from '../Conditional';
import { Retrieve } from '../Retrieve';

const DataForm = ({ uid, data, to }) => {
  const [done, setDone] = useState(false);

  return (
    <MForm
      deleteUrl={uid && `/api/user/${uid}/`}
      saveUrl={uid ? `/api/user/${uid}/` : '/api/user/'}
      data={data || {}}
      onDone={() => setDone(true)}
    >
      <Field name="username" />
      <Field name="email" />
      <Field name="first_name" />
      <Field name="last_name" />
      <Field name="password" type="password" />
      <Conditional cond={done}>
        <Redirect to={to} />
      </Conditional>
    </MForm>
  );
};

const Form = ({ uid, isStaff, ...props }) => {
  /* eslint-disable camelcase */
  const data = { is_staff: isStaff };
  /* eslint-enable camelcase */

  return (
    <>
      <Conditional cond={uid}>
        <Retrieve url={`/api/user/${uid}/`} method="GET">
          <DataForm uid={uid} {...props} />
        </Retrieve>
      </Conditional>

      <Conditional cond={!uid}>
        <DataForm id={uid} data={data} {...props} />
      </Conditional>
    </>
  );
};

export { Form };
