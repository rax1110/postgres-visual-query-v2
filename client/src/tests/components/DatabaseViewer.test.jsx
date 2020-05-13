import React from 'react';
import { shallow } from 'enzyme';
import { DatabaseViewer } from '../../components/DatabaseViewer';

describe('Component: DatabaseViewer', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      columns: [
        {
          column_name: 'oid',
          data_type: 'oid',
          ordinal_position: 1,
          table_name: '_pg_foreign_data_wrappers',
          table_schema: 'information_schema',
        },
        {
          column_name: 'fdowner',
          data_type: 'oid',
          ordinal_position: 2,
          table_name: '_pg_foreign_data_wrappers',
          table_schema: 'information_schema',
        },
      ],
      tables: [
        {
          table_name: '_pg_foreign_data_wrappers',
          table_schema: 'information_schema',
          table_type: 'BASE TABLE',
        },
      ],
      schemas: ['information_schema'],
      selectedSchema: 'information_schema',
      constraints: [{
        column_name: '{oid}',
        constraint_name: 'ak_unique',
        constraint_type: 'UNIQUE',
        foreign_column_name: null,
        foreign_table_name: null,
        foreign_table_schema: null,
        table_name: '_pg_foreign_data_wrappers',
        table_schema: 'information_schema',
      }],
      queryTable: [],
      searchExpr: '',
    };
  });

  test('DatabaseViewer renders with default props', () => {
    component = shallow(<DatabaseViewer {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('DatabaseViewer renders with simple searchExpr', () => {
    props.searchExpr = '_pg';
    component = shallow(<DatabaseViewer {...props} />);

    expect(component).toMatchSnapshot();

    props.searchExpr = '_pg_foreign_data_wrappers ';
    component = shallow(<DatabaseViewer {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('DatabaseViewer renders with complex searchExpr', () => {
    props.searchExpr = '#BASE_TABLE';
    component = shallow(<DatabaseViewer {...props} />);

    expect(component).toMatchSnapshot();

    props.searchExpr = '#BASE_TABLE _pg';
    component = shallow(<DatabaseViewer {...props} />);

    expect(component).toMatchSnapshot();

    props.searchExpr = '#BASE_TABLE _pg_foreign_data_wrappers ';
    component = shallow(<DatabaseViewer {...props} />);

    expect(component).toMatchSnapshot();
  });
});
