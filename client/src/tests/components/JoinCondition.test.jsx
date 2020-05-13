import React from 'react';
import { shallow } from 'enzyme';
import { JoinCondition } from '../../components/JoinCondition';

describe('Component: JoinCondition', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      tables: [
        {
          id: 1,
          table_alias: '',
          table_name: 'amet',
          table_schema: 'public',
          table_type: 'BASE TABLE',
          columns: [
            {
              column_name: 'amet_kood',
              constraints: [],
              data_type: 'smallint',
              ordinal_position: 1,
              table_alias: '',
              table_id: 1,
              table_name: 'amet',
              table_schema: 'public',
            },
            {
              column_name: 'nimetus',
              constraints: [],
              data_type: 'smallint',
              ordinal_position: 2,
              table_alias: '',
              table_id: 1,
              table_name: 'amet',
              table_schema: 'public',
            },
            {
              column_name: 'kirjeldus',
              constraints: [],
              data_type: 'smallint',
              ordinal_position: 3,
              table_alias: '',
              table_id: 1,
              table_name: 'amet',
              table_schema: 'public',
            },
          ],
        },
        {
          id: 2,
          table_alias: '',
          table_name: 'asukoht',
          table_schema: 'public',
          table_type: 'BASE TABLE',
          columns: [
            {
              column_name: 'asukoht_kood',
              constraints: [],
              data_type: 'smallint',
              ordinal_position: 1,
              table_alias: '',
              table_id: 1,
              table_name: 'asukoht',
              table_schema: 'public',
            },
            {
              column_name: 'nimetus',
              constraints: [],
              data_type: 'smallint',
              ordinal_position: 2,
              table_alias: '',
              table_id: 1,
              table_name: 'asukoht',
              table_schema: 'public',
            },
          ],
        },
      ],
      join: {
        color: '#ddbf4f',
        conditions: [{
          id: 0,
          main_column: '',
          secondary_column: '',
          secondary_table: {
            table_alias: '',
            table_name: '',
            table_schema: '',
          },
        }],
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
      },
      condition: {
        id: 0,
        main_column: '',
        secondary_column: '',
        secondary_table: {
          table_alias: '',
          table_name: '',
          table_schema: '',
        },
      },
      key: 'join-1-condition-1',
      language: { code: 'eng' },
      updateJoin: jest.fn(),
    };
  });

  test('JoinCondition renders with default props', () => {
    component = shallow(<JoinCondition {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('JoinCondition handleMainColumnChange calls updateJoin once', () => {
    component = shallow(<JoinCondition {...props} />);

    const e = {
      target: {
        value: JSON.stringify({ id: 'id', column_name: 'asukoht' }),
        id: 1,
      },
      preventDefault: jest.fn(),
    };

    component.find('CustomInput').first().simulate('change', e);

    expect(props.updateJoin).toBeCalled();
  });

  test('JoinCondition handleSecondaryColumnChange calls updateJoin once', () => {
    component = shallow(<JoinCondition {...props} />);

    const e = {
      target: {
        value: JSON.stringify({ id: 'id', column_name: 'asukoht' }),
        id: 1,
      },
      preventDefault: jest.fn(),
    };

    component.find('CustomInput').at(2).simulate('change', e);

    expect(props.updateJoin).toBeCalled();
  });

  test('JoinCondition handleRemove calls updateJoin once', () => {
    component = shallow(<JoinCondition {...props} />);

    component.find('Button').simulate('click');

    expect(props.updateJoin).toBeCalled();
  });

  test('JoinCondition handleSecondaryTableChange calls updateJoin once', () => {
    component = shallow(<JoinCondition {...props} />);

    const e = {
      target: {
        value: JSON.stringify({
          id: 'id',
          table: {
            id: 1,
            table_alias: '',
            table_name: 'amet',
            table_schema: 'public',
            table_type: 'BASE TABLE',
            columns: [
              {
                column_name: 'amet_kood',
                constraints: [],
                data_type: 'smallint',
                ordinal_position: 1,
                table_alias: '',
                table_id: 1,
                table_name: 'amet',
                table_schema: 'public',
              },
              {
                column_name: 'nimetus',
                constraints: [],
                data_type: 'smallint',
                ordinal_position: 2,
                table_alias: '',
                table_id: 1,
                table_name: 'amet',
                table_schema: 'public',
              },
              {
                column_name: 'kirjeldus',
                constraints: [],
                data_type: 'smallint',
                ordinal_position: 3,
                table_alias: '',
                table_id: 1,
                table_name: 'amet',
                table_schema: 'public',
              },
            ],
          },
        }),
        id: 1,
      },
      preventDefault: jest.fn(),
    };

    component.find('CustomInput').at(1).simulate('change', e);

    expect(props.updateJoin).toBeCalled();
  });
});
