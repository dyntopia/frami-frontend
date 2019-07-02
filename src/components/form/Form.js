import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';

import { Remove } from './Remove';
import { Save } from './Save';
import { Conditional } from '../Conditional';
import { Message } from '../Message';
import { Retrieve } from '../Retrieve';

const Form = ({ children, data, deleteUrl, saveUrl, onDone }) => {
  const [remove, setRemove] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [values, setValues] = useState(data);
  const { t } = useTranslation();

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const toggleSubmit = (e) => {
    e.preventDefault();
    setSubmit(!submit);
  };

  const toggleRemove = () => {
    setRemove(!remove);
  };

  const fields = React.Children.map(children, (c) => {
    const disabled = c.props.disabled || submit || remove;
    const onChange = handleChange;
    const value = values[c.props.name] || '';
    values[c.props.name] = value;
    return React.cloneElement(c, { disabled, onChange, value });
  });

  return (
    <>
      <Grid container justify="center">
        <form onSubmit={toggleSubmit}>
          <FormControl>
            {fields}

            <Conditional cond={saveUrl}>
              <Save />
            </Conditional>
          </FormControl>
        </form>
      </Grid>

      <Conditional cond={deleteUrl}>
        <Remove onClick={toggleRemove} />
      </Conditional>

      <Conditional cond={submit || remove}>
        <Retrieve
          method={remove ? 'DELETE' : values.id ? 'PATCH' : 'POST'}
          url={remove ? deleteUrl : saveUrl}
          data={submit && values}
        >
          <Message
            open
            type="success"
            key="success"
            text={t('label.done')}
            onClose={onDone}
          />
        </Retrieve>
      </Conditional>
    </>
  );
};

export { Form };
