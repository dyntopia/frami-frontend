import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Conditional } from '../../Conditional';
import { Field, Form as MForm } from '../../form';
import { Retrieve } from '../../Retrieve';

const DataForm = (props) => {
  const { data, rid, uid, to } = props;
  const [done, setDone] = useState(false);

  return (
    <MForm
      deleteUrl={rid && `/api/result/${rid}/`}
      saveUrl={rid ? `/api/result/${rid}/` : '/api/result/'}
      data={data || { patient: uid }}
      onDone={() => setDone(true)}
    >
      <Field name="kind" />
      <Field name="result" multiline rows="10" />
      <Conditional cond={done}>
        <Redirect to={to} />
      </Conditional>
    </MForm>
  );
};

const Form = (props) => {
  const { rid } = props;

  return (
    <>
      <Conditional cond={rid}>
        <Retrieve url={`/api/result/${rid}/`} method="GET">
          <DataForm {...props} />
        </Retrieve>
      </Conditional>

      <Conditional cond={!rid}>
        <DataForm {...props} />
      </Conditional>
    </>
  );
};

export { Form };
