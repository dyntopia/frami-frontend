import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { Conditional } from '../../Conditional';
import { Field, Form as MForm } from '../../form';
import { Message } from '../../Message';
import { Progress } from '../../Progress';
import { useRequest } from '../../../hooks';

const DataForm = ({ aid, data, to }) => {
  const [done, setDone] = useState(false);

  /* eslint-disable camelcase */
  return (
    <MForm
      deleteUrl={aid && `/api/appointment/${aid}/`}
      data={{
        ...data,
        start_date: format(data.start_date, 'YYYY-MM-DDTHH:MM'),
        end_date: format(data.end_date, 'YYYY-MM-DDTHH:MM'),
      }}
      onDone={() => setDone(true)}
    >
      <Field name="start_date" type="datetime-local" disabled />
      <Field name="end_date" type="datetime-local" disabled />
      <Field name="staff" disabled />
      <Field name="patient" disabled />
      <Field name="note" disabled />
      <Conditional cond={done}>
        <Redirect to={to} />
      </Conditional>
    </MForm>
  );
  /* eslint-enable camelcase */
};

const Form = (props) => {
  const [message, setMessage] = useState(true);
  const [state, request] = useRequest();
  const { t } = useTranslation();
  const { aid } = props;

  if (aid) {
    if (!state.started) {
      request('get', `/api/appointment/${aid}/`);
      return <Progress />;
    }

    if (state.loading) {
      return <Progress />;
    }

    if (state.error) {
      return (
        <Message
          open={message}
          type="error"
          text={t('message.apiError')}
          onClose={() => setMessage(false)}
        />
      );
    }
  }

  return <DataForm {...props} data={state.data || {}} />;
};

export { Form };
