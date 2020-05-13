import React from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { changeSelectedSchema } from '../actions/databaseActions';
import { withToggle } from '../hocs/withToggle';
import { translations } from '../utils/translations';

export const SchemaSelector = (props) => {
  const handleOnClick = (schema) => {
    props.changeSelectedSchema(schema);
  };

  return (
    <div className="mb-2">
      <h5>{translations[props.language.code].sideBar.schemaH}</h5>
      <Dropdown
        size="sm"
        className="w-100"
        isOpen={props.toggleStatus}
        toggle={props.toggle}
      >
        <DropdownToggle caret className="w-100 btn btn-light btn-outline-secondary text-truncate">
          {props.selectedSchema}
        </DropdownToggle>
        <DropdownMenu>
          {props.schemas.map(schema => (
            <DropdownItem
              key={schema}
              onClick={() => handleOnClick(schema)}
            >
              {schema}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

SchemaSelector.propTypes = {
  changeSelectedSchema: PropTypes.func,
  language: PropTypes.shape({ code: PropTypes.string }),
  selectedSchema: PropTypes.string,
  schemas: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.shape({ table_type: PropTypes.string, table_name: PropTypes.string }),
  toggle: PropTypes.func,
  toggleStatus: PropTypes.bool,
};

const mapStateToProps = store => ({
  schemas: store.database.schemas,
  selectedSchema: store.database.selectedSchema,
  language: store.settings.language,
});

const mapDispatchToProps = {
  changeSelectedSchema,
};

export default withToggle(connect(mapStateToProps, mapDispatchToProps)(SchemaSelector));
