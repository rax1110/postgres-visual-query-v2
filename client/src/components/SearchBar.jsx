import React, { Component } from 'react';
import { Input } from 'reactstrap';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { search } from '../actions/databaseActions';
import { translations } from '../utils/translations';

export class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expr: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.search(this.state.expr);
    });
  }

  render() {
    return (
      <div>
        <Input
          bsSize="sm"
          type="text"
          id="searchBar"
          name="expr"
          placeholder={translations[this.props.language.code].sideBar.searchPh}
          value={this.state.expr}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  search: PropTypes.func,
  language: PropTypes.shape({ code: PropTypes.string }),
};

const mapStateToProps = store => ({
  language: store.settings.language,
});

const mapDispatchToProps = {
  search,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
