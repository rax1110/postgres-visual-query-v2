import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { disconnect } from '../actions/hostActions';
import { translations } from '../utils/translations';

export const DisconnectButton = (props) => {
  const handleOnClick = () => {
    props.disconnect();
  };

  if (!props.connected) {
    return <Redirect to="/" />;
  }

  return (
    <Button size="lg" className="btn-block my-2 px-2" color="danger" onClick={handleOnClick}>
      {translations[props.language.code].sideBar.disconnectB}
    </Button>
  );
};

DisconnectButton.propTypes = {
  disconnect: PropTypes.func,
  connected: PropTypes.bool,
  language: PropTypes.shape({ code: PropTypes.string }),
};

const mapStateToProps = store => ({
  connected: store.host.connected,
  language: store.settings.language,
});

const mapDispatchToProps = {
  disconnect,
};

export default connect(mapStateToProps, mapDispatchToProps)(DisconnectButton);
