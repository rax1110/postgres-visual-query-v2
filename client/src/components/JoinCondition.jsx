import React from 'react';
import { Button, CustomInput, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as PropTypes from 'prop-types';
import { updateJoin } from '../actions/queryActions';
import { translations } from '../utils/translations';

export const JoinCondition = (props) => {
  const handleMainColumnChange = (e) => {
    e.preventDefault();

    const value = JSON.parse(e.target.value);

    let condition = _.cloneDeep(props.condition);

    condition = {
      ...condition,
      main_column: value.column_name,
    };

    const conditions = _.cloneDeep(props.join.conditions);
    const conditionIndex = conditions.findIndex(_condition => _condition.id === value.id);

    conditions[conditionIndex] = condition;

    let join = _.cloneDeep(props.join);

    join = {
      ...join,
      conditions,
    };

    props.updateJoin(join);
  };

  const handleSecondaryTableChange = (e) => {
    e.preventDefault();

    const value = JSON.parse(e.target.value);

    let condition = _.cloneDeep(props.condition);

    condition = {
      ...condition,
      secondary_table: value.table,
      secondary_column: '',
    };

    const conditions = _.cloneDeep(props.join.conditions);
    const conditionIndex = conditions.findIndex(_condition => _condition.id === value.id);

    conditions[conditionIndex] = condition;

    let join = _.cloneDeep(props.join);

    join = {
      ...join,
      conditions,
    };

    props.updateJoin(join);
  };

  const handleSecondaryColumnChange = (e) => {
    e.preventDefault();

    const value = JSON.parse(e.target.value);

    let condition = _.cloneDeep(props.condition);

    condition = {
      ...condition,
      secondary_column: value.column_name,
    };

    const conditions = _.cloneDeep(props.join.conditions);
    const conditionIndex = conditions.findIndex(_condition => _condition.id === value.id);

    conditions[conditionIndex] = condition;

    let join = _.cloneDeep(props.join);

    join = {
      ...join,
      conditions,
    };

    props.updateJoin(join);
  };

  const handleRemove = () => {
    let conditions = _.cloneDeep(props.join.conditions);

    conditions = conditions.filter(condition => condition.id !== props.condition.id);

    let join = _.cloneDeep(props.join);

    join = {
      ...join,
      conditions,
    };

    props.updateJoin(join);
  };

  const defaultValue = {
    id: props.condition.id,
    table: {
      table_schema: '',
      table_name: '',
      table_alias: '',
    },
  };

  return (
    <Row form className="my-2">
      <div className="col-auto">
        <InputGroup size="sm">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{props.join.main_table.table_name}</InputGroupText>
          </InputGroupAddon>
          <CustomInput
            type="select"
            id="main_table_columns"
            onChange={handleMainColumnChange}
            defaultValue=""
          >
            <option
              key={`${props.condition.id}-main-column-null`}
              value=""
            >
              {translations[props.language.code].queryBuilder.joinConditionMainColumn}
            </option>
            {props.join.main_table.columns.map((column) => {
              const value = {
                id: props.condition.id,
                column_name: column.column_name,
              };

              return (
                <option
                  key={`${props.condition.id}-main-column-${column.column_name}`}
                  value={JSON.stringify(value)}
                >
                  {column.column_name}
                </option>
              );
            })}
          </CustomInput>
        </InputGroup>
      </div>
      <div className="col-auto align-self-center">
        <FontAwesomeIcon icon="equals" size="xs" />
      </div>
      <div className="col-auto">
        <InputGroup size="sm">
          <CustomInput
            bsSize="sm"
            type="select"
            id="secondary_table"
            className="text-secondary"
            onChange={handleSecondaryTableChange}
            defaultValue={JSON.stringify(defaultValue)}
          >
            <option
              key={`${props.condition.id}-secondary-table-null`}
              value={JSON.stringify(defaultValue)}
            >
              {translations[props.language.code].queryBuilder.joinConditionSecondaryTable}
            </option>
            {props.tables.map((table) => {
              const value = {
                id: props.condition.id,
                table,
              };
              const option = table.table_alias.length > 0 ? `${table.table_name} (${table.table_alias})` : `${table.table_name}`;

              return props.join.main_table.id !== table.id && (
                <option
                  key={`${props.condition.id}-secondary-table-${table.id}`}
                  value={JSON.stringify(value)}
                >
                  {option}
                </option>
              );
            })}
          </CustomInput>
          <CustomInput
            bsSize="sm"
            type="select"
            id="secondary_table_columns"
            className="text-secondary"
            onChange={handleSecondaryColumnChange}
            defaultValue=""
          >
            <option key={`${props.condition.id}-secondary-column-null`} value="">
              {translations[props.language.code].queryBuilder.joinConditionSecondaryColumn}
            </option>
            {!_.isEmpty(props.condition.secondary_table.table_name)
            && props.condition.secondary_table.columns.map((column) => {
              const value = {
                id: props.condition.id,
                column_name: column.column_name,
              };

              return (
                <option
                  key={`${props.condition.id}-secondary-column-${column.column_name}`}
                  value={JSON.stringify(value)}
                >
                  {column.column_name}
                </option>
              );
            })}
          </CustomInput>
        </InputGroup>
      </div>
      <div className="col-auto ml-auto">
        <Button size="sm" color="danger" onClick={handleRemove}>
          <FontAwesomeIcon icon="times" />
        </Button>
      </div>
    </Row>
  );
};

JoinCondition.propTypes = {
  id: PropTypes.string,
  language: PropTypes.shape({ code: PropTypes.string }),
  join: PropTypes.shape({
    id: PropTypes.number,
    conditions: PropTypes.array,
    main_table: PropTypes.shape({
      table_name: PropTypes.string,
      id: PropTypes.number,
      columns: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    color: PropTypes.string,
    join_type: PropTypes.string,
  }),
  updateJoin: PropTypes.func,
  condition: PropTypes.shape({
    id: PropTypes.number,
    secondary_table: PropTypes.shape({
      table_name: PropTypes.string,
      columns: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
  tables: PropTypes.arrayOf(PropTypes.shape({
    table_alias: PropTypes.string,
    table_name: PropTypes.string,
    table_schema: PropTypes.string,
  })),
};

const mapStateToProps = store => ({
  tables: store.query.tables,
  language: store.settings.language,
});

const mapDispatchToProps = {
  updateJoin,
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinCondition);
