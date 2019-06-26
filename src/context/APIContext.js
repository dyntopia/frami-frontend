import React from 'react';
import axios from 'axios';

const APIContext = React.createContext(axios.create({
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
}));

export { APIContext };
