const Conditional = ({ cond, children }) => {
  return (
    cond ? children : null
  );
};

export { Conditional };
