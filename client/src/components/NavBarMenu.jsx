import * as PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import _ from 'lodash';
import { InputWithDeleteButton } from './InputWithDeleteButton';
import { AddNewButton } from './AddNewButton';
import { translations } from '../utils/translations';
import { addQuery } from '../actions/queriesActions';
import { setActiveQuery } from '../actions/queryActions';

export const NavBarMenu = (props) => {
  const [queryName, setQueryName] = useState('');

  const handleAddQuery = () => {
    props.addQuery(props.activeQuery.id);
  };

  const handleChange = (e) => {
    setQueryName(e.target.value);

    let query = _.cloneDeep(props.activeQuery);

    query = {
      ...query,
      [e.currentTarget.name]: e.target.value || '',
    };

    props.setActiveQuery(query);
  };

  const handleRemove = (e) => {
    let query = _.cloneDeep(props.activeQuery);

    setQueryName('');

    query = {
      ...query,
      [e.currentTarget.name]: '',
    };

    props.setActiveQuery(query);
  };

  return (
    <div className="pl-2 align-self-start m-0 pt-1 pb-2 bg-light">
      {props.activeQuery.id !== 0 && (
        <>
          <Row form>
            <div className="col-auto">
              <InputWithDeleteButton
                className="pb-2"
                id="newQueryAlias"
                name="queryName"
                placeholder={`${translations[props.language.code].queryBuilder.queryNamePh}`}
                tooltipTarget="newQueryAlias"
                tooltipText={` ${translations[props.language.code].tooltips.queryName}`}
                value={queryName}
                handleChange={handleChange}
                handleRemove={handleRemove}
              />
            </div>
          </Row>
        </>
      )}
      <div className="col-12 pl-0 text-info pt-6">
        <AddNewButton size="sm" id="newQuery" onClick={handleAddQuery} />
        {` ${translations[props.language.code].queryBuilder.queryH}`}
      </div>
    </div>
  );
};

NavBarMenu.propTypes = {
  language: PropTypes.shape({ code: PropTypes.string }),
  activeQuery: PropTypes.shape({ id: PropTypes.number }),
  addQuery: PropTypes.func,
  setActiveQuery: PropTypes.func,
};

const mapStateToProps = store => ({
  activeQuery: store.query,
  queries: store.queries,
});

const mapDispatchToProps = {
  addQuery,
  setActiveQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarMenu);
