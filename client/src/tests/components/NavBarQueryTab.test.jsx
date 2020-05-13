import React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { NavBarQueryTab } from '../../components/NavBarQueryTab';

describe('Component: NavBarQueryTab', () => {
  let props;
  let mockStore;
  let component;

  beforeEach(() => {
    props = {
      queryTabContent: {
        id: 3,
        queryName: 'Query 3',
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
      setActiveQuery: jest.fn(),
      updateQueries: jest.fn(),
    };

    mockStore = configureStore([thunk]);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<NavBarQueryTab {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('NavBarQueryTab handleClick should set new active query and update queries', () => {
    component = shallow(<NavBarQueryTab {...props} store={mockStore()} />);

    component.find('Button').simulate('click', {
      preventDefault: jest.fn(),
    });

    expect(props.setActiveQuery).toBeCalled();
    expect(props.updateQueries).toBeCalled();
  });
});
