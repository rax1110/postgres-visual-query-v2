import { Button, NavLink } from 'reactstrap';
import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as PropTypes from 'prop-types';
import { setActiveQuery } from '../actions/queryActions';
import { updateQueries } from '../actions/queriesActions';

export const NavBarQueryTab = (props) => {
  const handleClick = (e) => {
    e.preventDefault();

    const lastActiveQuery = props.queries.find(query => query.id === props.activeQuery.id);

    props.setActiveQuery(props.queryTabContent);
    props.updateQueries(lastActiveQuery, props.queryTabContent.id);
  };

  return (
    <div className="pr-1 pt-1 pb-1">
      <Button
        value={props.queryName}
        className={props.active ? 'btn-sm btn-secondary' : 'btn-sm btn-light btn-outline-secondary'}
        onClick={handleClick}
      >
        {props.queryTabContent.id === 0 && (
          <FontAwesomeIcon
            icon="home"
            size="1x"
            className="pr-2"
            style={{ width: '1.6rem' }}
          />
        )}
        <NavLink className="p-0 d-inline">{props.queryName}</NavLink>
      </Button>
    </div>
  );
};

NavBarQueryTab.propTypes = {
  language: PropTypes.shape({ code: PropTypes.string }),
  queries: PropTypes.arrayOf(PropTypes.shape({})),
  activeQuery: PropTypes.shape({ id: PropTypes.number }),
  queryTabContent: PropTypes.shape({ id: PropTypes.number }),
  updateQueries: PropTypes.func,
  setActiveQuery: PropTypes.func,
  queryName: PropTypes.string,
  active: PropTypes.bool,
};

const mapStateToProps = (store) => {
  const queries = [...store.queries, store.query];

  return ({
    activeQuery: store.query,
    queries,
  });
};

const mapDispatchToProps = {
  setActiveQuery,
  updateQueries,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarQueryTab);
