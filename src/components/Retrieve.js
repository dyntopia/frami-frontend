import React, { useState, useContext } from 'react';
import debug from 'debug';
import { useTranslation } from 'react-i18next';

import { APIContext } from '../context';
import { Message } from './Message';
import { Progress } from './Progress';
import { filterObj } from '../utils';

const log = debug('app:Retrieve:log');
const error = debug('app:Retrieve:error');

const retrieve = async (api, method, url, data, onSuccess, onFailure) => {
  log('%s %s %o', method, url, data);
  try {
    const { data: result } = await api({ method, url, data });
    log('%o', result);
    onSuccess(Array.isArray(result) ? result : [result]);
  } catch (err) {
    error(err);
    onFailure(err);
  }
};

const Retrieve = ({ method, url, data, children }) => {
  const [success, setSuccess] = useState(null);
  const [failure, setFailure] = useState(false);
  const { t } = useTranslation();
  const api = useContext(APIContext);

  if (success || failure) {
    /* istanbul ignore next */
    return (
      <>
        {success.map((elt) => (
          React.cloneElement(children, { key: elt.id, data: elt })
        ))}
        <Message
          open={Boolean(failure)}
          type="error"
          text={t('message.apiError')}
          onClose={() => setFailure(false)}
        />
      </>
    );
  }

  retrieve(api, method, url, filterObj(data), setSuccess, setFailure);
  return <Progress />;
};

export { Retrieve };
