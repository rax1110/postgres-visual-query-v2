import React from 'react';
import * as renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import FilterOperandSelectbox from '../../components/FilterOperandSelectbox';

describe('Component: FilterOperandSelectbox', () => {
  let store;
  let mockStore;
  let component;

  beforeEach(() => {
    const props = {
      column: {},
      updateColumnOperand: jest.fn(),
    };

    mockStore = configureStore([thunk]);
    store = mockStore(props);
    component = (
      <Provider store={store}>
        <FilterOperandSelectbox {...props} />
      </Provider>
    );
  });

  it('renders correctly', () => {
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('FilterOperandSelectBox handleChange should set filter operand', () => {
    component = mount(component);

    component.find('CustomInput').simulate('change', {
      target: {
        value: 'OR',
      },
    });

    expect(component.find('CustomInput').prop('value')).toEqual('OR');
  });
});
