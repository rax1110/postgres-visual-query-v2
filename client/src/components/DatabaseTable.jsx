import React from 'react';
import { Button, Tooltip } from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as PropTypes from 'prop-types';
import { addColumn, addTable, removeTable } from '../actions/queryActions';
import { withToggle } from '../hocs/withToggle';

export const DatabaseTable = ({ data, checked, id, addTableProp, toggle, toggleStatus }) => {
  const handleOnClick = () => {
    addTableProp(data);
  };

  let tableTypeColor = 'primary';

  if (_.isEqual(data.table_type, 'VIEW')) {
    tableTypeColor = 'info';
  } else if (_.isEqual(data.table_type, 'FOREIGN')) {
    tableTypeColor = 'secondary';
  } else if (_.isEqual(data.table_type, 'MATERIALIZED VIEW')) {
    tableTypeColor = 'light';
  }

  const btnSelected = checked ? 'success' : tableTypeColor;

  const modifiers = {
    preventOverflow: {
      enabled: false,
    },
    hide: {
      enabled: false,
    },
  };

  return (
    <div className="w-100 pr-1">
      <Button
        size="sm"
        color={btnSelected}
        id={id}
        className="btn-block my-1 pt-0 text-left"
        onClick={handleOnClick}
      >
        <small
          color={tableTypeColor}
          className="text-truncate align-self-start"
        >
          <span className="mr-1 px-0">
            <FontAwesomeIcon icon="th-large" />
          </span>
          {data.table_type}
        </small>
        <div className="text-truncate">
          {` ${data.table_name}`}
        </div>
      </Button>
      <Tooltip
        placement="right"
        isOpen={toggleStatus}
        target={id}
        toggle={toggle}
        modifiers={modifiers}
        delay={{ show: 200, hide: 0 }}
        className=""
      >
        {data.table_name}
      </Tooltip>
    </div>
  );
};

DatabaseTable.propTypes = {
  data: PropTypes.shape({ table_type: PropTypes.string, table_name: PropTypes.string }),
  checked: PropTypes.bool,
  id: PropTypes.string,
  addTableProp: PropTypes.func,
  toggle: PropTypes.func,
  toggleStatus: PropTypes.bool,
};

const mapDispatchToProps = {
  addColumn,
  addTableProp: data => addTable(data),
  removeTable,
};

export default withToggle(connect(null, mapDispatchToProps)(DatabaseTable));
