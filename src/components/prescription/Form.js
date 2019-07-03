import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Field, Form as MForm } from '../form';
import { Conditional } from '../Conditional';
import { Retrieve } from '../Retrieve';

const DataForm = ({ uid, pid, data, to }) => {
  const [done, setDone] = useState(false);

  return (
    <MForm
      deleteUrl={pid && `/api/prescription/${pid}/`}
      saveUrl={pid ? `/api/prescription/${pid}/` : '/api/prescription/'}
      data={data || { user: uid }}
      onDone={() => setDone(true)}
    >
      <Field name="medication" />
      <Field name="quantity" />
      <Field name="note" />
      <Conditional cond={done}>
        <Redirect to={to} />
      </Conditional>
    </MForm>
  );
};

const Form = (props) => {
  const { pid } = props;

  return (
    <>
      <Conditional cond={pid}>
        <Retrieve url={`/api/prescription/${pid}/`} method="GET">
          <DataForm {...props} />
        </Retrieve>
      </Conditional>

      <Conditional cond={!pid}>
        <DataForm {...props} />
      </Conditional>
    </>
  );
};

export { Form };
