import React from 'react';
import { shallow } from 'enzyme';
import { CustomInput } from 'reactstrap';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Draggable } from 'react-beautiful-dnd';
import { Join } from '../../components/Join';

describe('Component: Join', () => {
  let component;
  let props;
  let mockStore;

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
        conditions: [],
        id: 0,
        main_table: {
          table_alias: '',
          table_name: '',
          table_schema: '',
        },
        type: 'inner',
      },
      language: { code: 'eng' },
      key: 'join-1',
      id: 'join-1',
      index: 1,
      updateJoin: jest.fn(),
      removeJoin: jest.fn(),
    };

    mockStore = configureMockStore([thunk]);
  });

  test('Join render with default props', () => {
    component = shallow(<Join {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('Join handleTypeChange calls updateJoin once', () => {
    component = shallow(<Join {...props} store={mockStore()} />);

    const componentBody = shallow(
      component.find(Draggable).prop('children')({}),
    );

    componentBody
      .find(CustomInput)
      .first()
      .simulate('change', {
        target: { value: 'inner' },
        preventDefault: jest.fn(),
      });

    expect(props.updateJoin).toBeCalled();
  });

  test('Join handleTableChange calls updateJoin once', () => {
    component = shallow(<Join {...props} store={mockStore()} />);

    const componentBody = shallow(
      component.find(Draggable).prop('children')({}),
    );

    const target = {
      value: JSON.stringify({
        table_schema: '',
        table_name: '',
        table_alias: '',
      }),
    };

    componentBody
      .find(CustomInput)
      .at(1)
      .simulate('change', {
        target,
        preventDefault: jest.fn(),
      });

    expect(props.updateJoin).toBeCalled();
  });

  test('Join handleAddCondition calls updateJoin once', () => {
    component = shallow(<Join {...props} store={mockStore()} />);

    const componentBody = shallow(
      component.find(Draggable).prop('children')({}),
    );

    componentBody
      .find('Button')
      .first()
      .simulate('click');

    expect(props.updateJoin).toBeCalled();
  });
});
