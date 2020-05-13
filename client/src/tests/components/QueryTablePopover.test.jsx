import React from 'react';
import { shallow } from 'enzyme';
import { QueryTablePopover } from '../../components/QueryTablePopover';

describe('Component: QueryTablePopover', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      language: { code: 'eng' },
      updateTable: jest.fn(),
      target: 'target',
      data: {
        id: 1,
        table_alias: '',
        table_name: 'amet',
        table_schema: 'public',
        table_type: 'BASE TABLE',
        columns: [
          {
            column_aggregate: '',
            column_alias: '',
            column_distinct_on: false,
            column_filter: '',
            column_group_by: false,
            column_name: 'amet_kood',
            column_order: false,
            column_order_dir: true,
            constraints: [{
              column_name: '{amet_kood}',
              constraint_name: 'pk_amet',
              constraint_type: 'PRIMARY KEY',
              foreign_column_name: null,
              foreign_table_name: null,
              foreign_table_schema: null,
              table_name: 'amet',
              table_schema: 'public',
            }],
            data_type: 'smallint',
            display_in_query: true,
            id: 1,
            ordinal_position: 1,
            table_alias: '',
            table_id: 1,
            table_name: 'amet',
            table_schema: 'public',
          },
          {
            column_aggregate: '',
            column_alias: '',
            column_distinct_on: false,
            column_filter: '',
            column_group_by: false,
            column_name: 'nimetus',
            column_order: false,
            column_order_dir: true,
            constraints: [],
            data_type: 'smallint',
            display_in_query: true,
            id: 2,
            ordinal_position: 2,
            table_alias: '',
            table_id: 1,
            table_name: 'amet',
            table_schema: 'public',
          },
        ],
      },
    };
  });

  test('QueryTablePopover renders with default props', () => {
    component = shallow(<QueryTablePopover {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('QueryTablePopover handleRemove calls updateTable once', () => {
    component = shallow(<QueryTablePopover {...props} />);

    component.instance().handleRemove({ target: { id: 'table_alias' } });

    expect(props.updateTable.mock.calls.length).toBe(1);
  });

  test('QueryTablePopover handleSave calls updateTable once', () => {
    component = shallow(<QueryTablePopover {...props} />);

    component.instance().handleSave();

    expect(props.updateTable.mock.calls.length).toBe(1);
  });
});
