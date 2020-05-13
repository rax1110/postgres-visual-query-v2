import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  Button,
  Card,
  CardBody,
  Container,
  CustomInput,
  Form,
  FormGroup,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeJoin, updateJoin } from '../actions/queryActions';
import JoinCondition from './JoinCondition';
import { translations } from '../utils/translations';

export const Join = (props) => {
  const handleTypeChange = (e) => {
    e.preventDefault();

    let join = _.cloneDeep(props.join);

    join = {
      ...join,
      type: e.target.value,
    };

    props.updateJoin(join);
  };

  const handleTableChange = (e) => {
    e.preventDefault();

    const value = JSON.parse(e.target.value);

    let join = _.cloneDeep(props.join);
    let conditions = _.cloneDeep(props.join.conditions);

    if (_.isEmpty(value.table_name)
      || (!_.isEmpty(props.join.main_table.table_name)
        && !_.isEqual(props.join.main_table.table_name, value.table_name))) {
      conditions = [];
    }

    join = {
      ...join,
      main_table: value,
      conditions,
    };

    props.updateJoin(join);
  };

  const handleAddCondition = () => {
    let id = 0;

    if (props.join.conditions.length > 0) {
      id = props.join.conditions[props.join.conditions.length - 1].id + 1;
    }

    const condition = {
      id,
      main_column: '',
      secondary_table: {
        table_schema: '',
        table_name: '',
        table_alias: '',
      },
      secondary_column: '',
    };

    let { join } = props;

    const conditions = _.cloneDeep(props.join.conditions);

    conditions.push(condition);

    join = {
      ...join,
      conditions,
    };

    props.updateJoin(join);
  };

  const handleRemove = () => {
    props.removeJoin(props.join);
  };

  const defaultValue = {
    table_schema: '',
    table_name: '',
    table_alias: '',
  };

  const isTableSelected = _.isEmpty(props.join.main_table.table_name);

  let firstTable;

  if (props.tables.length) {
    firstTable = props.tables[0].table_alias === ''
      ? `${props.tables[0].table_schema}.${props.tables[0].table_name}`
      : `${props.tables[0].table_alias}`;
  }

  return (
    <div className="my-2">
      <Draggable
        draggableId={props.id}
        index={props.index}
      >
        {provided => (
          <Card
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
          >
            <CardBody className="py-2 px-0">
              <Form>
                <Container fluid>
                  <Row>
                    <div className="col-auto d-flex">
                      <FontAwesomeIcon className="align-self-center" icon="sort" />
                    </div>
                    <div className="col-10 px-0">
                      <Row form className="mb-2 align-items-center">
                        <div className="col-auto ">
                          <FontAwesomeIcon
                            icon="link"
                            style={{ color: props.join.color }}
                          />
                        </div>
                        <div className="col-auto">
                          {props.index === 0
                            ? firstTable
                            : translations[props.language.code].queryBuilder.joinResult}
                        </div>
                        <div className="col-auto">
                          <FormGroup className="m-0">
                            <CustomInput
                              bsSize="sm"
                              type="select"
                              id={`${props.id}_join_type`}
                              onChange={handleTypeChange}
                              value={props.join.type}
                            >
                              <option value="inner">INNER JOIN</option>
                              <option value="left">LEFT JOIN</option>
                              <option value="right">RIGHT JOIN</option>
                              <option value="outer">OUTER JOIN</option>
                              <option value="cross">CROSS JOIN</option>
                            </CustomInput>
                            <UncontrolledTooltip
                              placement="top"
                              delay={{ show: 500, hide: 0 }}
                              target={`${props.id}_join_type`}
                            >
                              {translations[props.language.code].tooltips.joinType}
                            </UncontrolledTooltip>
                          </FormGroup>
                        </div>
                        <div className="col-5">
                          <FormGroup className="m-0">
                            <CustomInput
                              bsSize="sm"
                              type="select"
                              id="main_table"
                              onChange={handleTableChange}
                              defaultValue={JSON.stringify(defaultValue)}
                            >
                              <option
                                key={`${props.id}-null-query-${props.queryId}`}
                                value={JSON.stringify(defaultValue)}
                              >
                                {translations[props.language.code]
                                  .queryBuilder.joinMainTable}
                              </option>
                              {props.tables.map((table, index) => {
                                const value = JSON.stringify(table);
                                const option = table.table_alias.length > 0
                                  ? `${table.table_name} (${table.table_alias})`
                                  : `${table.table_name}`;

                                return index > 0 && (
                                  <option
                                    key={`join-${props.id}-table-${table.id}-query-${props.queryId}`}
                                    value={value}
                                  >
                                    {option}
                                  </option>
                                );
                              })}
                            </CustomInput>
                          </FormGroup>
                        </div>
                      </Row>
                      <Row form>
                        <div className="col-12 text-info">
                          <Button
                            className=""
                            outline
                            color="info"
                            size="sm"
                            id="addCondition"
                            disabled={isTableSelected}
                            onClick={handleAddCondition}
                          >
                            <FontAwesomeIcon icon="plus" />
                          </Button>
                          {' '}
                          {translations[props.language.code].queryBuilder.conditionH}
                        </div>
                      </Row>
                      {!_.isEmpty(props.join.conditions)
                      && (
                        <Card className="mt-2">
                          <CardBody className="py-0 px-2">
                            {props.join.conditions.map(condition => (
                              <JoinCondition
                                key={`join-${props.join.id}-condition-${condition.id}-query-${props.queryId}`}
                                condition={condition}
                                join={props.join}
                              />
                            ))}
                          </CardBody>
                        </Card>
                      )}
                    </div>
                    <div className="col-1 d-flex ml-auto pr-2 justify-content-end">
                      <FormGroup className="align-self-center m-0">
                        <Button
                          size="sm"
                          color="danger"
                          onClick={handleRemove}
                          id={`${props.id}_remove_join-${props.queryId}`}
                        >
                          <FontAwesomeIcon icon="times" />
                        </Button>
                      </FormGroup>
                    </div>
                  </Row>
                </Container>
              </Form>
            </CardBody>
          </Card>
        )}
      </Draggable>
    </div>
  );
};

Join.propTypes = {
  id: PropTypes.string,
  language: PropTypes.shape({ code: PropTypes.string }),
  join: PropTypes.shape({
    id: PropTypes.number,
    conditions: PropTypes.array,
    main_table: PropTypes.shape({ table_name: PropTypes.string }),
    color: PropTypes.string,
    type: PropTypes.string,
  }),
  updateJoin: PropTypes.func,
  removeJoin: PropTypes.func,
  tables: PropTypes.arrayOf(PropTypes.shape({
    table_alias: PropTypes.string,
    table_name: PropTypes.string,
    table_schema: PropTypes.string,
  })),
  index: PropTypes.number,
  queryId: PropTypes.number,
};

const mapStateToProps = store => ({
  tables: store.query.tables,
  language: store.settings.language,
});

const mapDispatchToProps = {
  updateJoin,
  removeJoin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Join);
