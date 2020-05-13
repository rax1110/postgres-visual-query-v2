import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import * as PropTypes from 'prop-types';
import { languages } from '../utils/translations';
import { changeLanguage } from '../actions/settingsActions';
import { withToggle } from '../hocs/withToggle';

export const LanguageSwitcher = (props) => {
  const handleOnClick = (data) => {
    props.changeLanguage(data);
  };

  return (
    <Dropdown direction="right" size="sm" isOpen={props.toggleStatus} toggle={props.toggle}>
      <DropdownToggle className="btn btn-light btn-outline-secondary" caret>
        {props.language.name}
      </DropdownToggle>
      <DropdownMenu>
        {languages.map(language => (
          <DropdownItem
            key={language.code}
            onClick={() => handleOnClick(language)}
          >
            {language.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

LanguageSwitcher.propTypes = {
  data: PropTypes.shape({ table_type: PropTypes.string, table_name: PropTypes.string }),
  changeLanguage: PropTypes.func,
  language: PropTypes.shape({ name: PropTypes.string }),
  toggle: PropTypes.func,
  toggleStatus: PropTypes.bool,
};

const mapStateToProps = store => ({
  language: store.settings.language,
});

const mapDispatchToProps = {
  changeLanguage,
};

export default withToggle(connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher));
