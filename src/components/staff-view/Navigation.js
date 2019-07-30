import React from 'react';

import { Navigation as BaseNavigation, NavigationItem } from '../navigation';

const Navigation = () => {
  return (
    <BaseNavigation>
      <NavigationItem to="/" label="home" />
      <NavigationItem to="/patient/" label="patient" plural />
      <NavigationItem to="/staff/" label="staff" plural />
      <NavigationItem to="/question/" label="question" plural />
      <NavigationItem to="/appointment/" label="appointment" plural />
      <NavigationItem
        to="/appointment-request/"
        label="appointment_request"
        plural
      />
      <NavigationItem to="/notification/" label="notification" plural />
    </BaseNavigation>
  );
};

export { Navigation };
