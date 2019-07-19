import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { format } from 'date-fns';

import { Field, Form as MForm } from '../form';
import { Conditional } from '../Conditional';
import { Retrieve } from '../Retrieve';

const ApproveForm = ({ data, to }) => {
  const [done, setDone] = useState(false);

  /* eslint-disable camelcase */
  return (
    <MForm
      deleteUrl={`/api/appointment-request/${data.id}/`}
      saveUrl="/api/appointment/"
      data={{
        ...data,
        id: null,
        start_date: format(
          data.start_date || Date.now(), 'YYYY-MM-DDTHH:MM'
        ),
        end_date: format(
          data.end_date || Date.now(), 'YYYY-MM-DDTHH:MM'
        ),
        patient: data && data.creator,
      }}
      onDone={setDone}
    >
      <Field name="start_date" type="datetime-local" />
      <Field name="end_date" type="datetime-local" />
      <Field name="staff" />
      <Field name="patient" />
      <Field name="note" />
      <Conditional cond={done}>
        <Retrieve
          method="DELETE"
          url={`/api/appointment-request/${data.id}/`}
        >
          <Redirect key={to} to={to} />
        </Retrieve>
      </Conditional>
    </MForm>
  );
  /* eslint-enable camelcase */
};

const RequestForm = ({ pid, data, to }) => {
  const [done, setDone] = useState(false);

  /* eslint-disable camelcase */
  return (
    <MForm
      deleteUrl={pid && `/api/appointment-request/${pid}/`}
      saveUrl="/api/appointment-request/"
      data={{
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
      <Field name="start_date" type="datetime-local" />
      <Field name="end_date" type="datetime-local" />
      <Field name="staff" />
      <Field name="subject" />
      <Field name="message" />
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
        <Retrieve url={`/api/appointment-request/${aid}/`} method="GET">
          <ApproveForm {...props} />
        </Retrieve>
      </Conditional>

      <Conditional cond={!aid}>
        <RequestForm {...props} />
      </Conditional>
    </>
  );
};

export { Form };
