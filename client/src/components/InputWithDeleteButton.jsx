import { Button, Input, InputGroup, InputGroupAddon, UncontrolledTooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import * as PropTypes from 'prop-types';

export const InputWithDeleteButton = (
  {
    id, placeholder, className, tooltipTarget, tooltipText,
    value, handleBlur, name, handleRemove, handleChange,
  },
) => (
  <InputGroup className={className} size="sm">
    <Input
      className="text-dark w-auto"
      type="text"
      id={id}
      value={value}
      onBlur={handleBlur}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      style={{ flexBasis: 'auto' }}
    />
    <UncontrolledTooltip
      placement="top"
      delay={{ show: 500, hide: 0 }}
      target={tooltipTarget}
    >
      {tooltipText}
    </UncontrolledTooltip>
    <InputGroupAddon addonType="append">
      <Button
        color="danger"
        id={id}
        onClick={handleRemove}
        name={name}
      >
        <FontAwesomeIcon icon="times" />
      </Button>
    </InputGroupAddon>
  </InputGroup>
);

InputWithDeleteButton.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  tooltipTarget: PropTypes.string,
  tooltipText: PropTypes.string,
  value: PropTypes.string,
  handleBlur: PropTypes.func,
  name: PropTypes.string,
  handleRemove: PropTypes.func,
  handleChange: PropTypes.func,
};
