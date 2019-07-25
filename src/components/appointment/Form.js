import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { format } from 'date-fns';

import { Field, Form as MForm } from '../form';
import { Conditional } from '../Conditional';
import { Retrieve } from '../Retrieve';
import { isStaff } from '../../utils';

const DataForm = ({ aid, data, to, user }) => {
  const [done, setDone] = useState(false);
  const disabled = !isStaff(user);

  /* eslint-disable camelcase */
  return (
    <MForm
      deleteUrl={aid && `/api/appointment/${aid}/`}
      saveUrl={aid ? `/api/appointment/${aid}/` : '/api/appointment/'}
      data={{
        staff: user.username,
        ...data,
        start_date: format(
          data ? data.start_date : Date.now(), 'YYYY-MM-DDTHH:MM'
        ),
        end_date: format(
          data ? data.end_date : Date.now(), 'YYYY-MM-DDTHH:MM'
        ),
      }}
      onDone={() => setDone(true)}
    >
      <Field name="start_date" type="datetime-local" disabled={disabled} />
      <Field name="end_date" type="datetime-local" disabled={disabled} />
      <Field name="staff" disabled={disabled} />
      <Field name="patient" disabled={disabled} />
      <Field name="note" disabled={disabled} />
      <Conditional cond={done}>
        <Redirect to={to} />
      </Conditional>
    </MForm>
  );
  /* eslint-enable camelcase */
};

const Form = (props) => {
  const { aid } = props;

  return (
    <>
      <Conditional cond={aid}>
        <Retrieve url={`/api/appointment/${aid}/`} method="GET">
          <DataForm {...props} />
        </Retrieve>
      </Conditional>

      <Conditional cond={!aid}>
        <DataForm {...props} />
      </Conditional>
    </>
  );
};

export { Form };
