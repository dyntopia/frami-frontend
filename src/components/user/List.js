import React from 'react';
import Add from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { Conditional } from '../Conditional';
import { Retrieve } from '../Retrieve';

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

const Cell = ({ id, page, children }) => {
  const classes = useStyles();
  return (
    <TableCell>
      <Link className={classes.link} to={`/${page}/${id}/`}>
        {children}
      </Link>
    </TableCell>
  );
};

const Row = ({ data, page }) => {
  const { t } = useTranslation();
  const role = data.is_staff ? t('label.staff') : t('label.patient');

  return (
    <Conditional cond={page === 'staff' ? data.is_staff : !data.is_staff}>
      <TableRow hover>
        <Cell id={data.id} page={page}>{data.first_name} {data.last_name}</Cell>
        <Cell id={data.id} page={page}>{data.username}</Cell>
        <Cell id={data.id} page={page}>{data.email}</Cell>
        <Cell id={data.id} page={page}>{role}</Cell>
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
        to={`/${page}/new/`}
      >
        <Add />
      </Fab>
    </>
  );
};

export { List };
