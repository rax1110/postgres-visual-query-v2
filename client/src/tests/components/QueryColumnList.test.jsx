import * as React from 'react';
import { shallow } from 'enzyme';
import { QueryColumnList } from '../../components/QueryColumnList';

describe('Component: QueryColumnList', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      updateColumns: jest.fn(),
      switchDistinctProp: jest.fn(),
      switchLimitProp: jest.fn(),
      setLimitValueProp: jest.fn(),
      distinct: false,
      limit: true,
      limitValue: '50',
      language: { code: 'eng' },
      queryId: 0,
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

  test('QueryColumnList renders with default props', () => {
    component = shallow(<QueryColumnList {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('QueryColumnList onDragEnd calls updateColumns once', () => {
    component = shallow(<QueryColumnList {...props} />);

    const result = {
      destination: {
        droppableId: 'drop-id-1',
        index: 0,
      },
      source: {
        droppableId: 'drop-id-2',
        index: 1,
      },
      draggableId: 'id-1',
    };

    component.find('DragDropContext').simulate('dragend', result);

    expect(props.updateColumns).toBeCalled();
  });

  test('QueryColumnList CustomInput calls switchDistinctProp onChange', () => {
    component = shallow(<QueryColumnList {...props} />);

    component.find('CustomInput').first().simulate('change');

    expect(props.switchDistinctProp).toBeCalled();
  });

  test('QueryColumnList CustomInput calls switchLimitProp onChange', () => {
    component = shallow(<QueryColumnList {...props} />);

    component.find('CustomInput').at(1).simulate('change');

    expect(props.switchLimitProp).toBeCalled();
  });

  test('QueryColumnList sets correct limit value and calls setLimitValue', () => {
    component = shallow(<QueryColumnList {...props} />);

    component.find('Input').simulate('change', {
      target: {
        value: '10',
      },
    });

    expect(props.setLimitValueProp).toBeCalled();
    // expect(component.find('Input').prop('value')).toEqual('10');
  });
});
