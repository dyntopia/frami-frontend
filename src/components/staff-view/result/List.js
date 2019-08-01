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

import { Retrieve } from '../../Retrieve';

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

const Cell = ({ uid, pid, page, children }) => {
  const classes = useStyles();

  return (
    <TableCell>
      <Link className={classes.link} to={`/${page}/${uid}/result/${pid}`}>
        {children}
      </Link>
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
  const { match: { params: { uid } }, page } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <Grid container justify="center">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('label.kind')}</TableCell>
              <TableCell>{t('label.result')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Retrieve url={`/api/result/?patient=${uid}`} method="GET">
              <Row {...props} />
            </Retrieve>
          </TableBody>
        </Table>
      </Grid>

      <Fab
        color="primary"
        aria-label="Add result"
        className={classes.add}
        component={Link}
        to={`/${page}/${uid}/result/add/`}
      >
        <Add />
      </Fab>
    </>
  );
};

export { List };
