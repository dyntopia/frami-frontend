import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Field, Form as MForm } from '../form';
import { Conditional } from '../Conditional';
import { Retrieve } from '../Retrieve';

const DataForm = ({ id, data, to }) => {
  const [done, setDone] = useState(false);

  return (
    <MForm
      deleteUrl={id && `/api/user/${id}/`}
      saveUrl={id ? `/api/user/${id}/` : '/api/user/'}
      data={data || {}}
      onDone={() => setDone(true)}
    >
      <Field name="username" />
      <Field name="email" />
      <Field name="first_name" />
      <Field name="last_name" />
      <Conditional cond={done}>
        <Redirect to={to} />
      </Conditional>
    </MForm>
  );
};

const Form = ({ id, isStaff, ...props }) => {
  /* eslint-disable camelcase */
  const data = { is_staff: isStaff };
  /* eslint-enable camelcase */

  return (
    <>
      <Conditional cond={id}>
        <Retrieve url={`/api/user/${id}/`} method="GET">
          <DataForm id={id} {...props} />
        </Retrieve>
      </Conditional>

      <Conditional cond={!id}>
        <DataForm id={id} data={data} {...props} />
      </Conditional>
    </>
  );
};

export { Form };
