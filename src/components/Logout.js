import React, { useContext, useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import debug from 'debug';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { APIContext } from '../context';
import { Message } from './Message';

const error = debug('app:Logout:error');

const Logout = ({ onSuccess }) => {
  const api = useContext(APIContext);
  const [dialog, setDialog] = useState(true);
  const [message, setMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const logout = async () => {
      try {
        await api.post('/logout/');
        onSuccess({});
        setSuccess(true);
      } catch (err) {
        error(err);
        setDialog(false);
        setMessage(true);
      }
    };
    logout();
  }, [api, onSuccess]);

  if (success) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Dialog open={dialog}>
        <DialogTitle>{t('message.bye')}</DialogTitle>
      </Dialog>

      <Message
        open={message}
        type="error"
        text={t('message.apiError')}
        onClose={() => setMessage(false)}
      />
    </>
  );
};

export { Logout };
