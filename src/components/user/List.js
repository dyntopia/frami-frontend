import React from 'react';
import Add from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import _ from 'lodash/fp';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { Conditional } from '../Conditional';
import { Retrieve } from '../Retrieve';
import { isPatient, isStaff } from '../../utils';

const useStyles = makeStyles((theme) => ({
  add: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
  link: {
    display: 'block',
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}));

const Cell = ({ uid, page, children }) => {
  const classes = useStyles();
  return (
    <TableCell>
      <Link className={classes.link} to={`/${page}/${uid}/`}>
        {children}
      </Link>
    </TableCell>
  );
};

const Row = ({ data, page }) => {
  const { t } = useTranslation();
  const group = _.head(data.groups) || 'unknown';
  const role = t(`label.${group}`);
  const name = (data.first_name || data.last_name) ?
    `${data.first_name} ${data.last_name}` :
    t('label.unknown');

  return (
    <Conditional cond={page === 'staff' ? isStaff(data) : isPatient(data)}>
      <TableRow hover>
        <Cell uid={data.id} page={page}>{name}</Cell>
        <Cell uid={data.id} page={page}>{data.username}</Cell>
        <Cell uid={data.id} page={page}>{data.email}</Cell>
        <Cell uid={data.id} page={page}>{role}</Cell>
      </TableRow>
    </Conditional>
  );
};

const List = ({ page }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
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
              <Row page={page} />
            </Retrieve>
          </TableBody>
        </Table>
      </Grid>

      <Fab
        color="primary"
        aria-label="Add user"
        className={classes.add}
        component={Link}
        to={`/${page}/add/`}
      >
        <Add />
      </Fab>
    </>
  );
};

export { List };
