import React, { useState } from 'react';

export const withTabSwitcher = WrappedComponent => (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (<WrappedComponent {...props} toggle={toggle} activeTab={activeTab} />);
};
