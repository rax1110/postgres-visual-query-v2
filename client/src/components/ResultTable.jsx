import React from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import _ from 'lodash';
import * as PropTypes from 'prop-types';

export const ResultTable = (props) => {
  const parseRows = () => {
    const parsedRows = [];
    const rows = _.cloneDeep(props.result.rows);

    rows.forEach((row) => {
      const tableRow = row;

      props.result.fields.forEach((field) => {
        if (_.isObject(tableRow[field.name]) || typeof (tableRow[field.name]) === 'boolean') {
          tableRow[field.name] = JSON.stringify(tableRow[field.name]);
        }
      });

      parsedRows.push(tableRow);
    });

    return parsedRows;
  };

  const generateColumns = () => {
    const columns = [];

    columns.push({
      Header: '#',
      id: 'row',
      maxWidth: 50,
      filterable: false,
      resizable: false,
      Cell: row => <div>{row.index + 1}</div>,
    });

    props.result.fields.forEach((field) => {
      columns.push({
        Header: field.name,
        accessor: field.name,
      });
    });

    return columns;
  };

  return (
    <div className="result">
      {props.result
      && (
        <ReactTable
          className="-striped -highlight"
          data={parseRows()}
          columns={generateColumns()}
          minRows="0"
          showPagination={parseRows().length > 20}
        />
      )}
      {props.error
      && (
        <div>
          {`ERROR: ${props.error.message}`}
          <div className="w-100" />
          {`CODE: ${props.error.code}`}
          <div className="w-100" />
          {`POSITION: ${props.error.position}`}
        </div>
      )}
    </div>
  );
};

ResultTable.propTypes = {
  result: PropTypes.shape({
    rows: PropTypes.arrayOf(PropTypes.shape({})),
    fields: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  error: PropTypes.shape({
    message: PropTypes.string,
    code: PropTypes.string,
    position: PropTypes.string,
  }),
};

const mapStateToProps = store => ({
  result: store.query.result,
  error: store.query.error,
});

export default connect(mapStateToProps)(ResultTable);
