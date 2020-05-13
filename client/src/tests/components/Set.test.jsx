import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { Draggable } from 'react-beautiful-dnd';
import { CustomInput } from 'reactstrap';
import { Set } from '../../components/Set';

describe('Component: Set', () => {
  let props;
  let mockStore;
  let component;

  beforeEach(() => {
    props = {
      language: { code: 'eng' },
      set: {
        id: 0,
        subqueryId: 1,
      },
      activeQuery: {
        id: 1,
        queryName: 'Query 1',
      },
      queries: [
        {
          id: 1,
          queryName: 'Query 1',
        },
        {
          id: 2,
          queryName: 'Query 2',
        },
      ],
      updateSet: jest.fn(),
      removeSet: jest.fn(),
    };

    mockStore = configureMockStore([thunk]);
  });

  it('renders correctly', () => {
    component = shallow(<Set {...props} store={mockStore()} />);

    expect(component).toMatchSnapshot();
  });

  test('Set handleTypeChange calls updateSet once', () => {
    component = shallow(<Set {...props} store={mockStore()} />);

    const componentBody = shallow(
      component.find(Draggable).prop('children')({}),
    );

    componentBody
      .find(CustomInput)
      .first()
      .simulate('change', {
        target: { value: 'union' },
        preventDefault: jest.fn(),
      });

    expect(props.updateSet).toBeCalled();
  });

  test('Set handleQueryChange calls updateSet once', () => {
    component = shallow(<Set {...props} store={mockStore()} />);

    const componentBody = shallow(
      component.find(Draggable).prop('children')({}),
    );

    componentBody
      .find(CustomInput)
      .at(1)
      .simulate('change', {
        target: { value: 1 },
        preventDefault: jest.fn(),
      });

    expect(props.updateSet).toBeCalled();
  });

  test('Set handleRemove calls removeSet once', () => {
    component = shallow(<Set {...props} store={mockStore()} />);

    const componentBody = shallow(
      component.find(Draggable).prop('children')({}),
    );

    componentBody
      .find('Button')
      .first()
      .simulate('click');

    expect(props.removeSet).toBeCalled();
  });
});
