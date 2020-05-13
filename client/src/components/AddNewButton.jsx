import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import * as PropTypes from 'prop-types';
import { Button } from 'reactstrap';

export const AddNewButton = ({ id, size, onClick }) => (
  <Button
    className=""
    outline
    color="info"
    size={size}
    id={id}
    onClick={onClick}
  >
    <FontAwesomeIcon icon="plus" />
  </Button>
);

AddNewButton.propTypes = {
  id: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
};
