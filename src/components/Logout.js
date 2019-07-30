import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Message } from './Message';
import { useRequest } from '../hooks';
import { Progress } from './Progress';

const Logout = ({ onSuccess }) => {
  const [state, request] = useRequest();
  const [message, setMessage] = useState(false);
  const { t } = useTranslation();

  if (!state.started) {
    request('post', '/logout/');
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

  onSuccess(true);
  return <Redirect to="/" />;
};

export { Logout };
