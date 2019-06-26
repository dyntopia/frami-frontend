import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/App';

const main = () => {
  const root = document.getElementById('root');
  const user = document.getElementById('user');
  const obj = JSON.parse(user ? user.textContent : '{}');

  ReactDOM.render(<App user={obj} />, root);
};

main();
