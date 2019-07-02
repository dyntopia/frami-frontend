import Grid from '@material-ui/core/Grid';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useTranslation } from 'react-i18next';

import { Conditional } from '../Conditional';
import { Retrieve } from '../Retrieve';

const Row = ({ data, type }) => {
  const { t } = useTranslation();
  const role = data.is_staff ? t('label.staff') : t('label.patient');

  return (
    <Conditional cond={type === 'staff' ? data.is_staff : !data.is_staff}>
      <TableRow>
        <TableCell>{data.first_name} {data.last_name}</TableCell>
        <TableCell>{data.username}</TableCell>
        <TableCell>{data.email}</TableCell>
        <TableCell>{role}</TableCell>
      </TableRow>
    </Conditional>
  );
};

const UserList = ({ type }) => {
  const { t } = useTranslation();

  return (
    <Grid container justify="center">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('label.name')}</TableCell>
            <TableCell>{t('label.username')}</TableCell>
            <TableCell>{t('label.email')}</TableCell>
            <TableCell>{t('label.role')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Retrieve url="/api/user/" method="GET">
            <Row type={type} />
          </Retrieve>
        </TableBody>
      </Table>
    </Grid>
  );
};

export { UserList };
