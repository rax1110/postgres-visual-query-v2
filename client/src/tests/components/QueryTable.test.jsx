import React from 'react';
import { shallow } from 'enzyme';
import { QueryTable } from '../../components/QueryTable';

describe('Component: QueryTable', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      language: { code: 'eng' },
      removeTable: jest.fn(),
      addTable: jest.fn(),
      key: 'query-table-1',
      id: 'query-talbe-1',
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

  test('QueryTable renders with default props', () => {
    component = shallow(<QueryTable {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('QueryTable handleCopy calls addTable calls', () => {
    component = shallow(<QueryTable {...props} />);

    component.instance().handleCopy();

    expect(props.addTable.mock.calls.length).toBe(1);
  });

  test('QueryTable handleRemoveTable calls addTable calls', () => {
    component = shallow(<QueryTable {...props} />);

    component.instance().handleRemoveTable();

    expect(props.removeTable.mock.calls.length).toBe(1);
  });

  test('QueryTable constructTable adds table alias to column', () => {
    component = shallow(<QueryTable {...props} />);

    const result = component.instance().constructData({});

    expect(result).toMatchObject({ table_alias: '' });
  });
});
