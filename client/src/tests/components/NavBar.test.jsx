import React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import NavBar from '../../components/NavBar';

describe('Component: NavBar', () => {
  let store;
  let mockStore;
  let component;
  let props;

  beforeEach(() => {
    props = {
      language: { code: 'eng' },
      query: {
        id: 0,
        queryName: 'Main',
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
    };

    mockStore = configureStore([thunk]);
    store = mockStore(props);
    component = (
      <Provider store={store}>
        <NavBar {...props} />
      </Provider>
    );
  });

  it('renders correctly', () => {
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('NavBar handleVisibility should toggle NavBarMenu visibility', () => {
    component = mount(component);

    component.find('Button').at(1).simulate('click');

    expect(component.find('NavBarMenu').exists()).toBeTruthy();

    component.find('Button').at(4).simulate('click');

    expect(component.find('NavBarMenu').exists()).toBeFalsy();
  });
});
