import React from 'react';
import { useTranslation } from 'react-i18next';

import { Menu } from './Menu';
import { Form } from './Form';
import { List } from './List';

const View = (props) => {
  const { match: { params: { add, uid } }, page } = props;
  const { t } = useTranslation();

  if (uid) {
    const menus = [
      [`/${page}/${uid}/profile/`, t('label.profile'), Form],
    ];
    return <Menu {...props} uid={uid} menus={menus} />;
  }

  if (add) {
    return <Form {...props} />;
  }

  return <List {...props} />;
};

export { View };
