import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Conditional } from '../../Conditional';
import { Field, Form as MForm } from '../../form';

const Form = (props) => {
  const { pageUrl, apiUrl } = props;
  const [done, setDone] = useState(false);

  return (
    <MForm
      saveUrl={apiUrl}
      onDone={() => setDone(true)}
    >
      <Field name="subject" />
      <Field name="message" multiline rows="10" />
      <Conditional cond={done}>
        <Redirect to={pageUrl} />
      </Conditional>
    </MForm>
  );
};

export { Form };
