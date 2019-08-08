import React from 'react';
import Typography from '@material-ui/core/Typography';

const Home = ({ user }) => {
  const { username } = user;

  return (
    <>
      <Typography paragraph>
        Hello, {username}!  This is frami, a medical system aimed at
        small hospitals and clinics.
      </Typography>
    </>
  );
};

export { Home };
