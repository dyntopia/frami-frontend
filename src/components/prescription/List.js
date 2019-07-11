import React from 'react';
import Add from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import ModeComment from '@material-ui/icons/ModeCommentOutlined';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { Retrieve } from '../Retrieve';
import { isStaff } from '../../utils';

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

const Cell = ({ uid, pid, page, children, user }) => {
  const classes = useStyles();

  if (!isStaff(user)) {
    return (
      <TableCell>
        {children}
      </TableCell>
    );
  }
  return (
    <TableCell>
      <Link className={classes.link} to={`/${page}/${uid}/prescription/${pid}`}>
        {children}
      </Link>
    </TableCell>
  );
};

const Row = (props) => {
  const { data, username, match: { params: { uid } } } = props;
  const { id, medication, note, prescriber, quantity } = data;

  return (
    <TableRow hover>
      <Cell {...props} uid={uid} pid={id}>{username}</Cell>
      <Cell {...props} uid={uid} pid={id}>{medication}</Cell>
      <Cell {...props} uid={uid} pid={id}>{quantity}</Cell>
      <Cell {...props} uid={uid} pid={id}>{prescriber}</Cell>
      <Cell {...props} uid={uid} pid={id}>{note && <ModeComment />}</Cell>
    </TableRow>
  );
};

const Rows = ({ data, ...props }) => {
  const { username } = data;

  return data.prescriptions.map((p) => (
    <Row key={p.id} username={username} data={p} {...props} />
  ));
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
              <TableCell>{t('label.username')}</TableCell>
              <TableCell>{t('label.medication')}</TableCell>
              <TableCell>{t('label.quantity')}</TableCell>
              <TableCell>{t('label.prescriber')}</TableCell>
              <TableCell>{t('label.note')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Retrieve url={`/api/user/${uid}`} method="GET">
              <Rows {...props} />
            </Retrieve>
          </TableBody>
        </Table>
      </Grid>

      <Fab
        color="primary"
        aria-label="Add user"
        className={classes.add}
        component={Link}
        to={`/${page}/${uid}/prescription/add/`}
      >
        <Add />
      </Fab>
    </>
  );
};

export { List };
