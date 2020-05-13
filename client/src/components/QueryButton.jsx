import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import * as PropTypes from 'prop-types';
import { query, updateValidity } from '../actions/queryActions';
import { translations } from '../utils/translations';
import { validateSql } from '../utils/validateQuery';

export const QueryButton = (props) => {
  const handleOnClick = () => {
    const isValid = validateSql(props.sql);

    props.updateValidity(isValid);

    if (isValid) {
      props.query(props);
    }
  };

  return (
    <Button
      type="button"
      size="lg"
      color="primary"
      className="mr-2"
      onClick={handleOnClick}
      disabled={props.querying}
    >
      {props.querying
        ? (
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="mr-2"
            >
              {translations[props.language.code].queryBuilder.querying}
            </div>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          </div>
        )
        : translations[props.language.code].queryBuilder.queryB}
    </Button>
  );
};

QueryButton.propTypes = {
  query: PropTypes.func,
  querying: PropTypes.bool,
  language: PropTypes.shape({ code: PropTypes.string }),
  sql: PropTypes.string,
  updateValidity: PropTypes.func,
};

const mapStateToProps = store => ({
  host: store.host.host,
  port: store.host.port,
  database: store.host.database,
  user: store.host.user,
  password: store.host.password,
  sql: store.query.sql,
  language: store.settings.language,
  querying: store.query.querying,
});

const mapDispatchToProps = {
  updateValidity,
  query,
};

export default connect(mapStateToProps, mapDispatchToProps)(QueryButton);
