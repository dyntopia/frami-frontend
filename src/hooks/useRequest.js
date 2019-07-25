import axios from 'axios';
import debug from 'debug';
import { useState } from 'react';

const log = debug('app:withRequest:log');
const error = debug('app:withRequest:error');
const api = axios.create({
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
});

const useRequest = () => {
  const [state, setState] = useState({
    started: false,
    loading: false,
    error: false,
    data: null,
  });

  const request = async (method, url, data) => {
    log('%s %s %o', method, url, data);
    setState((prev) => ({ ...prev, started: true, loading: true }));

    try {
      const { data: result } = await api({ method, url, data });
      log('%o', result);
      setState((prev) => ({ ...prev, data: result, loading: false }));
    } catch (err) {
      error('%o', err);
      setState((prev) => ({ ...prev, error: true, loading: false }));
    }
  };

  return [state, request];
};

export { useRequest };
