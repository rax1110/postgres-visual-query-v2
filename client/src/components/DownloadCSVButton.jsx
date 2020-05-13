import React from 'react';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';
import _ from 'lodash';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as PropTypes from 'prop-types';

export const DownloadCSVButton = (props) => {
  const getHeaders = (result) => {
    if (_.isNull(result)) {
      return [];
    }

    const headers = [];

    result.fields.forEach((field) => {
      const header = {
        label: field.name,
        key: field.name,
      };

      headers.push(header);
    });

    return headers;
  };

  const getData = (result) => {
    if (_.isNull(result)) {
      return [];
    }
    return result.rows;
  };

  const disabled = _.isNull(props.result);

  return (
    <CSVLink
      className="mr-2"
      data={getData(props.result)}
      headers={getHeaders(props.result)}
      filename="result.csv"
    >
      <Button disabled={disabled}>
        <FontAwesomeIcon icon="download" />
        <div className="d-inline"> CSV</div>
      </Button>
    </CSVLink>
  );
};

DownloadCSVButton.propTypes = {
  result: PropTypes.shape({}),
};

const mapStateToProps = store => ({
  result: store.query.result,
});

export default connect(mapStateToProps)(DownloadCSVButton);
