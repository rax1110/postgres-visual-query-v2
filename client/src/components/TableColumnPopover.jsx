import React from 'react';
import { Popover, PopoverBody, PopoverHeader, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import * as PropTypes from 'prop-types';
import { withToggle } from '../hocs/withToggle';
import { translations } from '../utils/translations';

export const TableColumnPopover = (props) => {
  const modifiers = {
    preventOverflow: {
      enabled: false,
    },
    hide: {
      enabled: false,
    },
  };

  return (
    <Popover
      modifiers={modifiers}
      placement="right"
      trigger="legacy"
      isOpen={props.toggleStatus}
      target={props.target}
      toggle={props.toggle}
      delay={{ show: 0, hide: 0 }}
    >
      <PopoverHeader>
        {translations[props.language.code].queryBuilder.foreignKeyH}
      </PopoverHeader>
      <PopoverBody className="p-1">
        <Scrollbars autoHeight autoHeightMax={400}>
          <Table bordered className="table-sm mb-3">
            <thead>
              <tr>
                <th>
                  {translations[props.language.code].queryBuilder.schemaTh}
                </th>
                <th>
                  {translations[props.language.code].queryBuilder.tableTh}
                </th>
                <th>
                  {translations[props.language.code].queryBuilder.columnTh}
                </th>
              </tr>
            </thead>
            <tbody>
              {props.foreignKeys.map(fk => (
                <tr
                  key={`${fk.foreign_table_schema}_${fk.foreign_table_name}_${fk.foreign_column_name}`}
                >
                  <td>{fk.foreign_table_schema}</td>
                  <td>{fk.foreign_table_name}</td>
                  <td>{fk.foreign_column_name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Scrollbars>
      </PopoverBody>
    </Popover>
  );
};

TableColumnPopover.propTypes = {
  data: PropTypes.shape({
    constraints: PropTypes.array,
    table_id: PropTypes.number,
    column_name: PropTypes.string,
    table_schema: PropTypes.string,
    table_name: PropTypes.string,
    data_type: PropTypes.string,
  }),
  toggle: PropTypes.func,
  toggleStatus: PropTypes.bool,
  target: PropTypes.string,
  language: PropTypes.shape({ code: PropTypes.string }),
  foreignKeys: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = store => ({
  language: store.settings.language,
});

export default withToggle(connect(mapStateToProps)(TableColumnPopover));
