import React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { NavBarMenu } from '../../components/NavBarMenu';

describe('Component: NavBarMenu', () => {
  let store;
  let props;
  let mockStore;
  let component;
  let div;

  beforeEach(() => {
    props = {
      language: { code: 'eng' },
      query: {
        id: 1,
        queryName: 'Query 1',
      },
      activeQuery: {
        id: 2,
        queryName: 'Main',
      },
      addQuery: jest.fn(),
      setActiveQuery: jest.fn(),
    };

    div = document.createElement('div');

    document.body.appendChild(div);

    mockStore = configureStore([thunk]);
    store = mockStore(props);
    component = mount(
      <Provider store={store}>
        <NavBarMenu {...props} />
      </Provider>, { attachTo: div },
    );
  });

  it('renders correctly', () => {
    store = mockStore(props);

    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('NavBarMenu handleAddQuery calls addQuery once', () => {
    component.find('AddNewButton').prop('onClick')();

    expect(props.addQuery).toBeCalled();
  });

  test('NavBarMenu handleChange should set correct query name and call setActiveQuery once', () => {
    component.find('input').simulate('change', {
      target: { value: 'queryTest' },
    });

    expect(component.find('input').prop('value')).toEqual('queryTest');
    expect(props.setActiveQuery).toBeCalled();
  });

  test('NavBarMenu handleRemove should set empty query name and call setActiveQuery once', () => {
    component.find('button').first().simulate('click', {
      currentTarget: { name: 'queryTest' },
    });

    expect(component.find('input').first().prop('value')).toEqual('');
    expect(props.setActiveQuery).toBeCalled();
  });
});
