import { CustomInput, Row } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as PropTypes from 'prop-types';
import { updateColumnOperand } from '../actions/queryActions';

const FilterOperandSelectbox = ({ column }) => {
  const dispatch = useDispatch();
  const [filterOperand, setFilterOperand] = useState('AND');

  useEffect(() => {
    dispatch(updateColumnOperand(filterOperand, column.id));
  }, [filterOperand, column.id, dispatch]);

  const handleChange = (e) => {
    setFilterOperand(e.target.value);
  };

  return (
    <Row form className="mb-2">
      <div className="ml-3">
        <CustomInput
          bsSize="sm"
          type="select"
          key={column.id}
          id="column_filter_operand"
          value={filterOperand}
          onChange={handleChange}
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
          <option value="AND NOT">AND NOT</option>
          <option value="OR NOT">OR NOT</option>
        </CustomInput>
      </div>
    </Row>
  );
};

FilterOperandSelectbox.propTypes = {
  column: PropTypes.shape({ id: PropTypes.number }),
};

export default FilterOperandSelectbox;
