import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as PropTypes from 'prop-types';

export const DownloadSQLButton = (props) => {
  const downloadContent = (name, content) => {
    if (navigator.msSaveBlob) {
      const blobObject = new Blob([content], { type: 'text/plain' });

      window.navigator.msSaveOrOpenBlob(blobObject, name);
    } else {
      const aTag = document.createElement('a');
      const file = new Blob([content], { type: 'text/plain' });

      aTag.href = URL.createObjectURL(file);
      aTag.download = name;

      document.body.appendChild(aTag);
      aTag.click();
    }
  };

  return (
    <Button
      className="mr-2"
      onClick={() => downloadContent('select_query.sql', props.sql)}
    >
      <FontAwesomeIcon icon="download" />
      <div className="d-inline"> SQL</div>
    </Button>
  );
};

DownloadSQLButton.propTypes = {
  sql: PropTypes.string,
};

const mapStateToProps = store => ({
  sql: store.query.sql,
});

export default connect(mapStateToProps)(DownloadSQLButton);
