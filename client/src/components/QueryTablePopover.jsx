import React, { Component } from 'react';
import { Button, Input, InputGroup, InputGroupAddon, Popover, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as PropTypes from 'prop-types';
import { updateTable } from '../actions/queryActions';
import { withToggle } from '../hocs/withToggle';
import { translations } from '../utils/translations';

export class QueryTablePopover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      table_alias: props.data.table_alias,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleRemove(e) {
    this.setState({ [e.target.id]: '' });

    let table = _.cloneDeep(this.props.data);

    table = {
      ...table,
      table_alias: '',
    };

    this.props.updateTable(table);
  }

  handleSave() {
    let table = _.cloneDeep(this.props.data);

    table = {
      ...table,
      table_alias: this.state.table_alias,
    };

    this.props.updateTable(table);
  }

  render() {
    return (
      <Popover
        trigger="legacy"
        placement="bottom"
        isOpen={this.props.toggleStatus}
        target={this.props.target}
        delay={{ show: 0, hide: 0 }}
        toggle={this.props.toggle}
      >
        <PopoverBody>
          <InputGroup size="sm">
            <Input
              type="text"
              name="table_alias"
              id="table_alias"
              placeholder={translations[this.props.language.code].queryBuilder.aliasH}
              onBlur={this.handleSave}
              onChange={this.handleChange}
              value={this.state.table_alias}
            />
            <InputGroupAddon addonType="append">
              <Button color="danger" id="table_alias" onClick={this.handleRemove}>
                <FontAwesomeIcon icon="times" />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </PopoverBody>
      </Popover>
    );
  }
}

QueryTablePopover.propTypes = {
  data: PropTypes.shape({ table_alias: PropTypes.string }),
  language: PropTypes.shape({ code: PropTypes.string }),
  updateTable: PropTypes.func,
  toggle: PropTypes.func,
  toggleStatus: PropTypes.bool,
  target: PropTypes.string,
};

const mapStateToProps = store => ({
  language: store.settings.language,
});

const mapDispatchToProps = {
  updateTable,
};

export default withToggle(connect(mapStateToProps, mapDispatchToProps)(QueryTablePopover));
