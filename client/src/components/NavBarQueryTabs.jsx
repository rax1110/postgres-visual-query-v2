import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import NavBarQueryTab from './NavBarQueryTab';
import { getCorrectQueryName } from '../utils/getCorrectQueryName';

export const NavBarQueryTabs = ({ queries, activeIndex, language }) => (
  <>
    {queries.map((query, index) => (
      <Fragment key={`query-${query.id}`}>
        <NavBarQueryTab
          key={`query-${query.id}`}
          id={`query-${query.id}`}
          queryTabContent={query}
          queryName={getCorrectQueryName(language, query.queryName, query.id)}
          active={index === activeIndex}
          index={index}
        />
      </Fragment>
    ))}
  </>
);

NavBarQueryTabs.propTypes = {
  language: PropTypes.shape({ code: PropTypes.string }),
  queries: PropTypes.arrayOf(PropTypes.shape({})),
  activeIndex: PropTypes.number,
};

const mapStateToProps = (store) => {
  const queries = [...store.queries, store.query].slice()
    .sort((query1, query2) => query1.id - query2.id);
  const activeIndex = queries.findIndex(query => query.id === store.query.id);

  return ({
    queries,
    activeIndex,
  });
};

export default connect(mapStateToProps)(NavBarQueryTabs);
