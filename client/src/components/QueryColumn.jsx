import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  Container,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';
import * as PropTypes from 'prop-types';
import { addColumn, removeColumn, updateColumn } from '../actions/queryActions';
import { translations } from '../utils/translations';
import { bannedWords } from '../utils/bannedWords';
import { getCorrectQueryName } from '../utils/getCorrectQueryName';

const CopyButton = ({ id, handleCopy, languageCode }) => (
  <div>
    <Button
      size="sm"
      color="secondary"
      id={`${id}_copy`}
      className="mr-1"
      onClick={handleCopy}
    >
      <FontAwesomeIcon icon="copy" />
    </Button>
    <UncontrolledTooltip placement="top" target={`${id}_copy`} delay={{ show: 500, hide: 0 }}>
      {translations[languageCode].tooltips.copyColumn}
    </UncontrolledTooltip>
  </div>
);

CopyButton.propTypes = {
  id: PropTypes.string,
  handleCopy: PropTypes.func,
  languageCode: PropTypes.string,
};

const RemoveButton = ({ id, handleRemoveColumn }) => (
  <div>
    <Button
      size="sm"
      color="danger"
      id={`${id}_remove`}
      onClick={handleRemoveColumn}
    >
      <FontAwesomeIcon icon="times" />
    </Button>
  </div>
);

RemoveButton.propTypes = {
  id: PropTypes.string,
  handleRemoveColumn: PropTypes.func,
};

export class QueryColumn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      column_alias: props.data.column_alias,
      column_filter: props.data.column_filter,
      filter_valid: true,
      dropDownOpen: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleRemoveColumn = this.handleRemoveColumn.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
  }

  componentDidMount() {
    if (this.props.data.subqueryId) {
      let column = _.cloneDeep(this.props.data);

      const subquerySql = this.props.queries
        .find(query => query.id === this.props.data.subqueryId).sql;

      column = {
        ...column,
        subquerySql,
      };

      this.props.updateColumn(column);
    }
  }

  handleDropDown() {
    this.setState(prevState => ({
      dropDownOpen: !prevState.dropDownOpen,
    }));
  }

  handleRemoveColumn() {
    this.props.removeColumn(this.props.data);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCopy() {
    this.props.addColumn(this.props.data);
  }

  handleRemove(e) {
    const { state } = this;

    this.setState({
      ...state,
      [e.currentTarget.name]: '',
    });

    let column = _.cloneDeep(this.props.data);

    column = {
      ...column,
      [e.currentTarget.name]: '',
    };

    if (_.isEqual(e.target.name, 'column_filter')) {
      this.setState({
        filter_valid: true,
      });
    }

    this.props.updateColumn(column);
  }

  handleSave(e) {
    let column = _.cloneDeep(this.props.data);

    if (e.currentTarget.name === 'subqueryDefault') {
      column = {
        ...column,
        subqueryId: 0,
        subquerySql: '',
      };
    }

    if (e.currentTarget.name === 'subqueryId') {
      const subqueryId = +e.target.value;
      const subquerySql = this.props.queries.find(query => query.id === subqueryId).sql;

      column = {
        ...column,
        subqueryId,
        subquerySql,
      };
    } else {
      column = {
        ...column,
        [e.target.name]: e.target.value,
      };
    }

    let contains = false;

    const filter = _.lowerCase(column.column_filter).split(' ');

    bannedWords.forEach((el) => {
      if (filter.includes(el)) {
        contains = true;
      }
    });

    if (contains) {
      this.setState({
        filter_valid: false,
      });
    } else {
      this.setState({
        filter_valid: true,
      });

      this.props.updateColumn(column);
    }
  }

  handleSwitch(e) {
    let column = _.cloneDeep(this.props.data);

    column = {
      ...column,
      [e.target.name]: !column[e.target.name],
    };

    this.props.updateColumn(column);
  }

  render() {
    const orderDirection = this.props.data.column_order_dir
      ? translations[this.props.language.code].queryBuilder.ascL
      : translations[this.props.language.code].queryBuilder.descL;
    const columnOrderVisibility = this.props.data.column_order ? 'visible' : 'invisible';
    const columnName = _.isEmpty(this.props.data.table_alias)
      ? `${this.props.data.table_name}.${this.props.data.column_name}`
      : `${this.props.data.table_alias}.${this.props.data.column_name}`;
    const filterValid = this.state.filter_valid ? '' : 'is-invalid';
    const linkedQuery = this.props.queries.find(query => query.id === this.props.data.subqueryId);
    const linkedQueryName = linkedQuery
      ? getCorrectQueryName(this.props.language, linkedQuery.queryName, linkedQuery.id)
      : translations[this.props.language.code].queryBuilder.linkSq;

    return (
      <Draggable
        draggableId={`${this.props.id}`}
        index={this.props.index}
      >
        {provided => (
          <div className="m-auto">
            <Card
              className="px-0 my-2"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              innerRef={provided.innerRef}
            >
              <CardBody className="mx-0 pr-2 pl-1 pt-1 pb-1">
                <Form inline className="align-content-center">
                  <Container fluid className="pr-0">
                    <Row form>
                      <div className="col-auto pl-0 pr-3 d-flex align-items-center">
                        <FontAwesomeIcon className="" icon="sort" />
                      </div>
                      <div className="col-10 p-0">
                        <Row form>
                          <div className="col-auto d-flex">
                            <CustomInput
                              className=""
                              type="checkbox"
                              id={`display-${this.props.data.id}`}
                              name="display_in_query"
                              checked={this.props.data.display_in_query}
                              onChange={this.handleSwitch}
                            />
                            <small
                              className="mr-2 align-self-center text-muted"
                            >
                              {`${this.props.data.table_schema}`}
                            </small>
                            <h6
                              className="m-0 mr-2 align-self-center"
                              id="column_name"
                            >
                              {columnName}
                            </h6>
                            <UncontrolledTooltip
                              placement="top"
                              delay={{ show: 0, hide: 0 }}
                              target="column_name"
                            >
                              {this.props.data.data_type}
                            </UncontrolledTooltip>
                          </div>
                          <div className="col-auto">
                            <FormGroup>
                              <CustomInput
                                className="mr-2"
                                disabled={this.props.distinct}
                                type="switch"
                                id={`column-distinct-on-${this.props.data.id}`}
                                name="column_distinct_on"
                                checked={this.props.data.column_distinct_on}
                                onChange={this.handleSwitch}
                                label={
                                  translations[this.props.language.code].queryBuilder.distinctOnL
                                }
                              />
                              <CustomInput
                                className="mr-2"
                                type="switch"
                                id={`column-group-by-${this.props.data.id}`}
                                name="column_group_by"
                                checked={this.props.data.column_group_by}
                                onChange={this.handleSwitch}
                                label={translations[this.props.language.code].queryBuilder.groupByL}
                              />
                              <CustomInput
                                className="mr-2"
                                type="switch"
                                id={`column-order-${this.props.data.id}`}
                                name="column_order"
                                checked={this.props.data.column_order}
                                onChange={this.handleSwitch}
                                label={translations[this.props.language.code].queryBuilder.orderL}
                              />
                              <CustomInput
                                className={columnOrderVisibility}
                                type="switch"
                                id={`column-order-dir-${this.props.data.id}`}
                                name="column_order_dir"
                                checked={this.props.data.column_order_dir}
                                onChange={this.handleSwitch}
                                label={orderDirection}
                              />
                            </FormGroup>
                          </div>
                        </Row>
                        <Row form>
                          <div className="col-auto">
                            <CustomInput
                              bsSize="sm"
                              type="select"
                              name="column_aggregate"
                              id={`column-aggregate-${this.props.data.id}`}
                              className="my-1 align-self-start"
                              value={this.props.data.column_aggregate}
                              onChange={this.handleSave}
                            >
                              <option value="">
                                {translations[this.props.language.code].queryBuilder.selectFunction}
                              </option>
                              <option value="AVG">AVG</option>
                              <option value="BIT_AND">BIT_AND</option>
                              <option value="BIT_OR">BIT_OR</option>
                              <option value="BOOL_AND">BOOL_AND</option>
                              <option value="BOOL_OR">BOOL_OR</option>
                              <option value="COUNT">COUNT</option>
                              <option value="MAX">MAX</option>
                              <option value="MIN">MIN</option>
                              <option value="SUM">SUM</option>
                              <option value="ASCII">ASCII</option>
                              <option value="BIT_LENGTH">BIT_LENGTH</option>
                              <option value="CHAR_LENGTH">CHAR_LENGTH</option>
                              <option value="INITCAP">INITCAP</option>
                              <option value="LENGTH">LENGTH</option>
                              <option value="LOWER">LOWER</option>
                              <option value="OCTET_LENGTH">OCTET_LENGTH</option>
                              <option value="REVERSE">REVERSE</option>
                              <option value="UPPER">UPPER</option>
                              <option value="TO_ASCII">TO_ASCII</option>
                              <option value="TO_HEX">TO_HEX</option>
                            </CustomInput>
                          </div>
                          <div className="col-auto">
                            <InputGroup
                              className="my-1 align-self-start"
                              size="sm"
                            >
                              <Input
                                style={{ flexBasis: 'auto' }}
                                className="text-dark"
                                type="text"
                                name="column_alias"
                                id={`column-alias-${this.props.data.id}`}
                                onBlur={this.handleSave}
                                onChange={this.handleChange}
                                value={this.state.column_alias}
                                placeholder={
                                  translations[this.props.language.code].queryBuilder.aliasPh
                                }
                              />
                              <UncontrolledTooltip
                                placement="top"
                                delay={{ show: 500, hide: 0 }}
                                target={`column-alias-${this.props.data.id}`}
                              >
                                {translations[this.props.language.code].tooltips.columnAlias}
                              </UncontrolledTooltip>
                              <InputGroupAddon addonType="append">
                                <Button
                                  color="danger"
                                  id={`column-alias-btn-${this.props.data.id}`}
                                  name="column_alias"
                                  onClick={this.handleRemove}
                                >
                                  <FontAwesomeIcon icon="times" />
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>
                          </div>
                          <div className="col-auto" style={{ minWidth: '35%' }}>
                            <InputGroup className="my-1 align-self-start" size="sm">
                              <Input
                                type="text-dark"
                                name="column_filter"
                                id={`column-filter-${this.props.data.id}`}
                                className={filterValid}
                                onBlur={this.handleSave}
                                onChange={this.handleChange}
                                value={this.state.column_filter}
                                placeholder={
                                  translations[this.props.language.code].queryBuilder.filterPh
                                }
                              />
                              <div className="invalid-feedback order-1">
                                {translations[this.props.language.code].tooltips.invalidFilter}
                              </div>
                              <UncontrolledTooltip
                                placement="top"
                                delay={{ show: 500, hide: 0 }}
                                target={`column-filter-${this.props.data.id}`}
                              >
                                {translations[this.props.language.code].tooltips.columnFilter}
                              </UncontrolledTooltip>
                              <InputGroupAddon addonType="append">
                                <ButtonDropdown
                                  isOpen={this.state.dropDownOpen}
                                  toggle={this.handleDropDown}
                                  id={`link-subquery-${this.props.data.id}`}
                                >
                                  <DropdownToggle
                                    className="btn-sm btn-light btn-outline-secondary"
                                    style={{ borderColor: '#d3d8de' }}
                                    caret
                                  >
                                    {linkedQueryName}
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem
                                      key="query-link-SQ"
                                      id={`subquery-default-${this.props.data.id}`}
                                      name="subqueryDefault"
                                      value=""
                                      onClick={this.handleSave}
                                    >
                                      {translations[this.props.language.code].queryBuilder.linkSq}
                                    </DropdownItem>
                                    {this.props.queries.map((query, index) => (
                                      <DropdownItem
                                        key={`query-${query.id}-column-${this.props.data.id}`}
                                        id={`subquerySql-${index}-${this.props.data.id}`}
                                        name="subqueryId"
                                        value={query.id}
                                        onClick={this.handleSave}
                                      >
                                        {getCorrectQueryName(
                                          this.props.language, query.queryName, query.id,
                                        )}
                                      </DropdownItem>
                                    ))}
                                  </DropdownMenu>
                                </ButtonDropdown>
                                <UncontrolledTooltip
                                  placement="top"
                                  delay={{ show: 500, hide: 0 }}
                                  target={`link-subquery-${this.props.data.id}`}
                                >
                                  {translations[this.props.language.code].tooltips.linkSq}
                                </UncontrolledTooltip>
                              </InputGroupAddon>
                              <InputGroupAddon addonType="append">
                                <Button
                                  color="danger"
                                  id={`column-filter-btn-${this.props.data.id}`}
                                  name="column_filter"
                                  onClick={this.handleRemove}
                                >
                                  <FontAwesomeIcon icon="times" />
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>
                          </div>
                          <div className="col-auto pt-2">
                            <CustomInput
                              className=""
                              type="switch"
                              id={`filter-as-having-${this.props.data.id}`}
                              name="filter_as_having"
                              checked={this.props.data.filter_as_having}
                              onChange={this.handleSwitch}
                              label={translations[this.props.language.code].queryBuilder.havingL}
                            />
                          </div>
                        </Row>
                      </div>
                      <div className="col d-flex w-100 ml-auto">
                        <FormGroup className="align-self-center justify-content-end m-0 ml-auto">
                          <CopyButton
                            id={`copy-btn-${this.props.data.id}`}
                            languageCode={this.props.language.code}
                            handleCopy={this.handleCopy}
                          />
                          <RemoveButton
                            id={`remove-btn-${this.props.data.id}`}
                            languageCode={this.props.language.code}
                            handleRemoveColumn={this.handleRemoveColumn}
                          />
                        </FormGroup>
                      </div>
                    </Row>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </div>
        )}
      </Draggable>
    );
  }
}

QueryColumn.propTypes = {
  data: PropTypes.shape({
    column_alias: PropTypes.string,
    column_filter: PropTypes.string,
    column_order_dir: PropTypes.bool,
    column_order: PropTypes.bool,
    table_alias: PropTypes.string,
    table_name: PropTypes.string,
    column_name: PropTypes.string,
    id: PropTypes.number,
    display_in_query: PropTypes.bool,
    table_schema: PropTypes.string,
    data_type: PropTypes.string,
    column_distinct_on: PropTypes.bool,
    column_group_by: PropTypes.bool,
    column_aggregate: PropTypes.string,
    subqueryId: PropTypes.number,
    filter_as_having: PropTypes.bool,
  }),
  removeColumn: PropTypes.func,
  addColumn: PropTypes.func,
  updateColumn: PropTypes.func,
  id: PropTypes.string,
  index: PropTypes.number,
  distinct: PropTypes.bool,
  language: PropTypes.shape({ code: PropTypes.string }),
  queries: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = store => ({
  distinct: store.query.distinct,
  language: store.settings.language,
  queries: store.queries.filter(query => query.id !== 0)
    .sort((query1, query2) => query1.id - query2.id),
});

const mapDispatchToProps = {
  updateColumn,
  removeColumn,
  addColumn,
};

export default connect(mapStateToProps, mapDispatchToProps)(QueryColumn);
