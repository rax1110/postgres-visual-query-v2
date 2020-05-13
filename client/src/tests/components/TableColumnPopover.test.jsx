import React from 'react';
import { shallow } from 'enzyme';
import { TableColumnPopover } from '../../components/TableColumnPopover';

describe('Component: TableColumnPopover', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      language: { code: 'eng' },
      target: 'target',
      foreignKeys: [
        {
          column_name: '{parkla_kood}',
          constraint_name: 'fk_parklakoht_parkla',
          constraint_type: 'FOREIGN KEY',
          foreign_column_name: '{parkla_kood}',
          foreign_table_name: 'parkla',
          foreign_table_schema: 'public',
          table_name: 'parklakoht',
          table_schema: 'public',
        },
      ],
    };
  });

  test('TableColumnPopover render with default props', () => {
    component = shallow(<TableColumnPopover {...props} />);

    expect(component).toMatchSnapshot();
  });
});
