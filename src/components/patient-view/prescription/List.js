import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ModeComment from '@material-ui/icons/ModeCommentOutlined';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useTranslation } from 'react-i18next';

import { Conditional } from '../../Conditional';
import { Retrieve } from '../../Retrieve';

const Cell = ({ children }) => {
  return (
    <TableCell>
      {children}
    </TableCell>
  );
};

const Row = (props) => {
  const [refillRequested, setRefillRequested] = useState(false);
  const { data, username, match: { params: { uid } } } = props;
  const {
    id,
    creator,
    medication,
    note,
    quantity,
    refill,
    refill_request: refillRequest,
  } = data;
  const { t } = useTranslation();

  return (
    <TableRow hover>
      <Cell {...props} uid={uid} pid={id}>{username}</Cell>
      <Cell {...props} uid={uid} pid={id}>{medication}</Cell>
      <Cell {...props} uid={uid} pid={id}>{quantity}</Cell>
      <Cell {...props} uid={uid} pid={id}>{creator}</Cell>
      <Cell {...props} uid={uid} pid={id}>{refill}</Cell>
      <Cell {...props} uid={uid} pid={id}>{note && <ModeComment />}</Cell>

      <Conditional cond={!refillRequest}>
        <Cell {...props} uid={uid} pid={id}>
          <Button onClick={() => setRefillRequested(true)}>
            {t('label.request_refill')}
          </Button>
        </Cell>
      </Conditional>

      <Conditional cond={refillRequest || refillRequested}>
        <Cell {...props} uid={uid} pid={id}>
          {refillRequest && t('label.refill_requested')}
        </Cell>
      </Conditional>

      <Conditional cond={refillRequested}>
        <Retrieve
          method="POST"
          url="/api/prescription-request/"
          data={{ prescription: id }}
        />
      </Conditional>
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
  const { match: { params: { uid } } } = props;
  const { t } = useTranslation();

  return (
    <Grid container justify="center">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('label.username')}</TableCell>
            <TableCell>{t('label.medication')}</TableCell>
            <TableCell>{t('label.quantity')}</TableCell>
            <TableCell>{t('label.prescriber')}</TableCell>
            <TableCell>{t('label.refill', { count: 2 })}</TableCell>
            <TableCell>{t('label.note')}</TableCell>
            <TableCell>{t('label.status')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Retrieve url={`/api/user/${uid}`} method="GET">
            <Rows {...props} />
          </Retrieve>
        </TableBody>
      </Table>
    </Grid>
  );
};

export { List };
