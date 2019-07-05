import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Conditional } from '../Conditional';
import { Field, Form as MForm } from '../form';

const Form = (props) => {
  const { qid, page } = props;
  const [done, setDone] = useState(false);

  return (
    <MForm
      saveUrl={qid ? '/api/answer/' : '/api/question/'}
      data={qid ? { question: qid } : {}}
      onDone={() => setDone(true)}
    >
      <Field name="subject" />
      <Field name="message" multiline rows="10" />
      <Conditional cond={done}>
        <Redirect to={`/${page}/`} />
      </Conditional>
    </MForm>
  );
};

export { Form };
