import React, { useState } from 'react';

export const withToggle = WrappedComponent => (props) => {
  const [toggleStatus, setToggleStatus] = useState(false);

  const toggle = () => {
    setToggleStatus(!toggleStatus);
  };

  return (
    <WrappedComponent
      {...props}
      toggle={toggle}
      toggleStatus={toggleStatus}
    />
  );
};
