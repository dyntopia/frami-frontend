import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Field, Form as MForm } from '../../form';
import { Conditional } from '../../Conditional';
import { Retrieve } from '../../Retrieve';
import { medication } from '../../../locales';

const DataForm = ({ uid, pid, data, to }) => {
  const [done, setDone] = useState(false);
  const { i18n } = useTranslation();
  const meds = medication[i18n.language] || medication.en;

  return (
    <MForm
      deleteUrl={pid && `/api/prescription/${pid}/`}
      saveUrl={pid ? `/api/prescription/${pid}/` : '/api/prescription/'}
      data={data || { patient: uid }}
      onDone={() => setDone(true)}
    >
      <Field inputProps={{ list: 'medication' }} name="medication" />
      <datalist id="medication">
        {meds.map((elt) => <option key={elt} value={elt} />)}
      </datalist>
      <Field name="quantity" />
      <Field name="refill" type="number" />
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
