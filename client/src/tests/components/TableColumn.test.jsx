import React from 'react';
import { shallow } from 'enzyme';
import { TableColumn } from '../../components/TableColumn';

describe('Component: TableColumn', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      removeColumn: jest.fn(),
      addColumn: jest.fn(),
      key: 'table-column-1',
      id: '1-table-column-1',
      data: {
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
      joins: [{
        color: '#ddbf4f',
        conditions: [],
        id: 0,
        main_table: {
          table_alias: '',
          table_name: '',
          table_schema: '',
          columns: [
            {
              column_name: 'asukoht_kood',
              constraints: [],
              data_type: 'smallint',
              ordinal_position: 1,
              table_alias: '',
              table_id: 2,
              table_name: 'asukoht',
              table_schema: 'public',
            },
            {
              column_name: 'nimetus',
              constraints: [],
              data_type: 'smallint',
              ordinal_position: 2,
              table_alias: '',
              table_id: 2,
              table_name: 'asukoht',
              table_schema: 'public',
            },
          ],
        },
        type: 'inner',
      }],
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
    };
  });

  test('TableColumn renders with default props', () => {
    component = shallow(<TableColumn {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('TableColumn handleRemove calls removeColumn once', () => {
    component = shallow(<TableColumn {...props} />);

    component.instance().handleRemove({});

    expect(props.removeColumn.mock.calls.length).toBe(1);
  });

  test('TableColumn handleOnChange calls addColumn once', () => {
    component = shallow(<TableColumn {...props} />);

    component.instance().handleOnChange({});

    expect(props.addColumn.mock.calls.length).toBe(1);
  });
});
