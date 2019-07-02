import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';

const Field = ({ name, ...props }) => {
  const { t } = useTranslation();

  return (
    <TextField
      name={name}
      label={t(`label.${name}`)}
      margin="normal"
      {...props}
    />
  );
};

export { Field };
