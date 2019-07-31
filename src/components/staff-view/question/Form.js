import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Conditional } from '../../Conditional';
import { Field, Form as MForm } from '../../form';

const Form = (props) => {
  const { qid, pageUrl } = props;
  const [done, setDone] = useState(false);

  return (
    <MForm
      saveUrl="/api/answer/"
      data={{ question: qid }}
      onDone={() => setDone(true)}
    >
      <Field name="message" multiline rows="10" />
      <Conditional cond={done}>
        <Redirect to={`${pageUrl}${qid}`} />
      </Conditional>
    </MForm>
  );
};

export { Form };
