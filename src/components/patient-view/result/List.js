import React from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useTranslation } from 'react-i18next';

import { Retrieve } from '../../Retrieve';

const Cell = ({ children }) => {
  return (
    <TableCell>
      {children}
    </TableCell>
  );
};

const Row = (props) => {
  const { data, match: { params: { uid } } } = props;
  const { id, kind, result } = data;

  return (
    <TableRow hover>
      <Cell {...props} uid={uid} pid={id}>{kind}</Cell>
      <Cell {...props} uid={uid} pid={id}>{result}</Cell>
    </TableRow>
  );
};

const List = (props) => {
  const { t } = useTranslation();

  return (
    <Grid container justify="center">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('label.kind')}</TableCell>
            <TableCell>{t('label.result')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Retrieve url="/api/result/" method="GET">
            <Row {...props} />
          </Retrieve>
        </TableBody>
      </Table>
    </Grid>
  );
};

export { List };
