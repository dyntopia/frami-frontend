import React from 'react';

const Conditional = ({ cond, children }) => {
  return (
    <div>{cond && children}</div>
  );
};

export { Conditional };
