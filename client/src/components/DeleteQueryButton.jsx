import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as PropTypes from 'prop-types';
import { deleteQuery, setActiveQuery } from '../actions/queryActions';
import { deleteQueries, removeMainFromQueries } from '../actions/queriesActions';

export const DeleteQueryButton = (props) => {
  const handleOnClick = () => {
    props.deleteQuery();

    const mainQuery = props.queries.find(query => query.id === 0);

    if (mainQuery) {
      props.removeMainFromQueries();
      props.setActiveQuery(mainQuery);
    } else {
      props.deleteQueries();
    }
  };

  return (
    <Button color="danger" className="mr-2" onClick={handleOnClick}>
      <FontAwesomeIcon icon="trash" />
    </Button>
  );
};

DeleteQueryButton.propTypes = {
  deleteQuery: PropTypes.func,
  deleteQueries: PropTypes.func,
  queries: PropTypes.arrayOf(PropTypes.shape({})),
  removeMainFromQueries: PropTypes.func,
  setActiveQuery: PropTypes.func,
};

const mapStateToProps = store => ({
  queries: store.queries,
});

const mapDispatchToProps = {
  deleteQuery,
  deleteQueries,
  removeMainFromQueries,
  setActiveQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteQueryButton);
