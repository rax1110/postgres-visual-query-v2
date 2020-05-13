import React from 'react';
import { shallow } from 'enzyme';
import { QueryColumn } from '../../components/QueryColumn';

describe('Component: QueryColumn', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      distinct: false,
      language: { code: 'eng' },
      queries: [{
        id: 1,
        queryName: 'Query 1',
        sql: 'SELECT',
      }],
      updateColumn: jest.fn(),
      removeColumn: jest.fn(),
      addColumn: jest.fn(),
      key: 'query-column-1',
      id: 'query-column-1',
      name: 'query-column-1',
      index: 1,
      data: {
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
        subqueryId: 1,
      },
    };
  });

  test('QueryColumn renders with default props', () => {
    component = shallow(<QueryColumn {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('QueryColumn handleSave calls updateColumn once', () => {
    component = shallow(<QueryColumn {...props} />);
    component.instance().handleSave({
      currentTarget: { name: 'subquerySql' },
      target: { name: 'column_aggregate', value: 'AVG' },
    });

    expect(props.updateColumn.mock.calls.length).toBe(2);
  });

  test('QueryColumn handleRemove calls updateColumn once', () => {
    component = shallow(<QueryColumn {...props} />);

    component.instance().handleRemove({ currentTarget: { name: '' }, target: 'column_alias' });

    expect(props.updateColumn.mock.calls.length).toBe(2);
  });

  test('QueryColumn handleSwitch calls updateColumn once', () => {
    component = shallow(<QueryColumn {...props} />);

    component.instance().handleSwitch({ target: 'column_order' });

    expect(props.updateColumn.mock.calls.length).toBe(2);
  });

  test('QueryColumn handleRemoveColumn calls removeColumn once', () => {
    component = shallow(<QueryColumn {...props} />);

    component.instance().handleRemoveColumn();

    expect(props.removeColumn.mock.calls.length).toBe(1);
  });

  test('QueryColumn handleCopy calls addColumn once', () => {
    component = shallow(<QueryColumn {...props} />);

    component.instance().handleCopy();

    expect(props.addColumn.mock.calls.length).toBe(1);
  });

  test('QueryColumn componentDidMount calls updateColumn once', () => {
    component = shallow(<QueryColumn {...props} />);

    component.instance().componentDidMount();

    expect(props.updateColumn.mock.calls.length).toBe(2);
  });
});
