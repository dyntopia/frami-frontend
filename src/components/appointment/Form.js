import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { Conditional } from '../Conditional';
import { Field, Form as MForm } from '../form';
import { Message } from '../Message';
import { Progress } from '../Progress';
import { isPatient, isStaff } from '../../utils';
import { useRequest } from '../../hooks';

const DataForm = ({ aid, data, to, user }) => {
  const [done, setDone] = useState(false);
  const [state, request] = useRequest();
  const disabled = !isStaff(user);

  if (!state.started) {
    request('get', '/api/user/');
  }

  /* eslint-disable camelcase */
  return (
    <MForm
      deleteUrl={aid && `/api/appointment/${aid}/`}
      saveUrl={aid ? `/api/appointment/${aid}/` : '/api/appointment/'}
      data={{
        staff: user.username,
        ...data,
        start_date: format(
          data.start_date || Date.now(), 'YYYY-MM-DDTHH:MM'
        ),
        end_date: format(
          data.end_date || Date.now(), 'YYYY-MM-DDTHH:MM'
        ),
      }}
      onDone={() => setDone(true)}
    >
      <Field name="start_date" type="datetime-local" disabled={disabled} />
      <Field name="end_date" type="datetime-local" disabled={disabled} />

      <Field
        inputProps={{ list: 'staff' }}
        name="staff"
        disabled={disabled}
      />
      <datalist id="staff">
        {(state.data || []).filter(isStaff).map((elt) => (
          <option key={elt.id} value={elt.username} />
        ))}
      </datalist>

      <Field
        inputProps={{ list: 'patient' }}
        name="patient"
        disabled={disabled}
      />
      <datalist id="patient">
        {(state.data || []).filter(isPatient).map((elt) => (
          <option key={elt.id} value={elt.username} />
        ))}
      </datalist>

      <Field name="note" disabled={disabled} />
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
