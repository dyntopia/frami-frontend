import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import debug from 'debug';
import qs from 'qs';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { APIContext } from '../context';
import { Message } from './Message';

const error = debug('app:Login:error');

const useStyles = makeStyles(() => ({
  forgotButton: {
    textTransform: 'none',
  },
}));

const Login = ({ onSuccess }) => {
  const [message, setMessage] = useState(false);
  const [values, setValues] = useState({ username: '', password: '' });
  const { t } = useTranslation();
  const classes = useStyles();
  const api = useContext(APIContext);

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/login/', qs.stringify(values));
      onSuccess(res.data);
    } catch (err) {
      error(err);
      setMessage(true);
    }
  };

  const handleClose = () => {
    setMessage(false);
  };

  return (
    <>
      <Grid container justify="center">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField
              margin="normal"
              name="username"
              label={t('label.username')}
              value={values.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              type="password"
              name="password"
              label={t('label.password')}
              value={values.password}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              {t('label.login')}
            </Button>
            <Button
              className={classes.forgotButton}
              color="primary"
              href="/reset/request/"
            >
              {t('label.forgot_password')}
            </Button>
          </FormControl>
        </form>
      </Grid>

      <Message
        open={message}
        type="error"
        text={t('message.invalidCredentials')}
        onClose={handleClose}
      />
    </>
  );
};

export { Login };
