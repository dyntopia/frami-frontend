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

const Cell = ({ pid, page, children }) => {
  const classes = useStyles();

  return (
    <TableCell>
      <Link className={classes.link} to={`/${page}/${pid}/`}>
        {children}
      </Link>
    </TableCell>
  );
};

const Row = (props) => {
  const { data, match: { params: { uid } }, status } = props;
  const {
    id,
    staff,
    patient,
    note,
    start_date: startDate,
    end_date: endDate,
  } = data;

  return (
    <TableRow hover>
      <Cell {...props} uid={uid} pid={id}>{staff}</Cell>
      <Cell {...props} uid={uid} pid={id}>{patient}</Cell>
      <Cell {...props} uid={uid} pid={id}>{startDate}</Cell>
      <Cell {...props} uid={uid} pid={id}>{endDate}</Cell>
      <Cell {...props} uid={uid} pid={id}>{note && <ModeComment />}</Cell>
      <Cell {...props} uid={uid} pid={id}>{status}</Cell>
    </TableRow>
  );
};

const List = (props) => {
  const { page } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <Grid container justify="center">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('label.staff')}</TableCell>
              <TableCell>{t('label.patient')}</TableCell>
              <TableCell>{t('label.start_date')}</TableCell>
              <TableCell>{t('label.end_date')}</TableCell>
              <TableCell>{t('label.note')}</TableCell>
              <TableCell>{t('label.status')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Retrieve url="/api/appointment/" method="GET">
              <Row {...props} status={t('label.scheduled')} />
            </Retrieve>
          </TableBody>
        </Table>
      </Grid>

      <Fab
        color="primary"
        aria-label="Add appointment"
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
