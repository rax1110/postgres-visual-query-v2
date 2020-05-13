import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import * as PropTypes from 'prop-types';
import TableColumnPopover from './TableColumnPopover';
import { addColumn, removeColumn } from '../actions/queryActions';
import { withToggle } from '../hocs/withToggle';
import { iconPicker } from '../utils/iconPicker';

export class TableColumn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      target: props.id,
      foreignKeys: this.findForeignKeys(),
    };

    this.handleRemove = this.handleRemove.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.findForeignKeys = this.findForeignKeys.bind(this);
  }

  handleRemove(data) {
    this.props.removeColumn(data);
  }

  handleOnChange() {
    this.props.addColumn(this.props.data);
  }

  findForeignKeys() {
    return this.props.data.constraints
      .filter(constraint => constraint.constraint_type.localeCompare('FOREIGN KEY') === 0);
  }

  render() {
    const btnSelected = this.props.columns.some(column => _.isEqual(column.table_id,
      this.props.data.table_id) && _.isEqual(column.column_name,
      this.props.data.column_name)) ? 'success' : 'light';

    const modifiers = {
      preventOverflow: {
        enabled: false,
      },
      hide: {
        enabled: false,
      },
    };

    return (
      <div className="d-flex align-items-center">
        <ButtonGroup size="sm" className="btn-block my-1 p-0 px-1">
          <Button
            color={btnSelected}
            className="text-left d-flex flex-row align-items-center w-100 px-1 border"
            id={`${this.state.target}-type`}
            onClick={this.handleOnChange}
          >
            {this.props.data.constraints.some(c => c.constraint_type.localeCompare('PRIMARY KEY') === 0)
            && <div className="mr-2 px-2 bg-info text-light rounded-pill">PK</div>}
            <div className="text-truncate d-flex">
              {!this.props.data.constraints.some(c => c.constraint_type.localeCompare('PRIMARY KEY') === 0)
              && (
                <span className={`mr-1 px-2 ${btnSelected === 'light' ? 'text-info' : 'text-light'}`}>
                  <FontAwesomeIcon icon={iconPicker(this.props.data.data_type)} />
                </span>
              )}
              <div className="text-truncate">{this.props.data.column_name}</div>
            </div>
            <div className="ml-auto pl-3">
              <div className="bg-light rounded-pill">
                {this.props.joins.map(join => join.conditions.map(condition => ((_.isEqual(
                  join.main_table.id,
                  this.props.data.table_id,
                ) && _.isEqual(condition.main_column, this.props.data.column_name))
                  || (_.isEqual(condition.secondary_table.id, this.props.data.table_id)
                    && _.isEqual(condition.secondary_column, this.props.data.column_name)))
                  && (
                  <FontAwesomeIcon
                    key={`condition-icon-${this.props.data.table_schema}-${this.props.data.table_name}-${this.props.data.column_name}-${_.uniqueId()}`}
                    className="mx-1"
                    icon="link"
                    style={{ color: join.color }}
                  />
                  )))}
              </div>
            </div>
          </Button>
          <Tooltip
            placement="left"
            isOpen={this.props.toggleStatus}
            target={`${this.state.target}-type`}
            toggle={this.props.toggle}
            modifiers={modifiers}
            delay={{ hide: 0 }}
          >
            {this.props.data.data_type}
          </Tooltip>
          {this.state.foreignKeys.length > 0
          && (
            <Button outline color="info" id={this.state.target} type="button">
              <FontAwesomeIcon
                icon="external-link-square-alt"
              />
            </Button>
          )}
        </ButtonGroup>
        {this.state.foreignKeys.length > 0
        && <TableColumnPopover target={this.state.target} foreignKeys={this.state.foreignKeys} />
        }
      </div>
    );
  }
}

TableColumn.propTypes = {
  id: PropTypes.string,
  removeColumn: PropTypes.func,
  addColumn: PropTypes.func,
  data: PropTypes.shape({
    constraints: PropTypes.array,
    table_id: PropTypes.number,
    column_name: PropTypes.string,
    table_schema: PropTypes.string,
    table_name: PropTypes.string,
    data_type: PropTypes.string,
  }),
  columns: PropTypes.arrayOf(PropTypes.shape({})),
  joins: PropTypes.arrayOf(PropTypes.shape({})),
  toggle: PropTypes.func,
  toggleStatus: PropTypes.bool,
};

const mapStateToProps = store => ({
  joins: store.query.joins,
  columns: store.query.columns,
});

const mapDispatchToProps = {
  removeColumn,
  addColumn,
};

export default withToggle(connect(mapStateToProps, mapDispatchToProps)(TableColumn));
