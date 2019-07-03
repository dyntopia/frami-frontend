import React from 'react';

import { Menu } from './Menu';
import { Form } from './Form';
import { List } from './List';
import { View as PrescriptionView } from '../prescription';

const View = (props) => {
  const { match: { params: { add, uid } }, page } = props;

  if (uid) {
    const menus = [
      [`/${page}/${uid}/profile/`, 'profile', Form],
      [`/${page}/${uid}/prescription/`, 'prescription', PrescriptionView],
    ];
    return <Menu {...props} uid={uid} menus={menus} />;
  }

  if (add) {
    return <Form {...props} />;
  }

  return <List {...props} />;
};

export { View };
