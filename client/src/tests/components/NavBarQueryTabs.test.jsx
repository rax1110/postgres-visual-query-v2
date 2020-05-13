import React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { NavBarQueryTabs } from '../../components/NavBarQueryTabs';

describe('Component: NavBarQueryTabs', () => {
  let props;
  let store;
  let mockStore;
  let component;

  beforeEach(() => {
    props = {
      activeIndex: 1,
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
        <NavBarQueryTabs {...props} />
      </Provider>
    );
  });

  it('renders correctly', () => {
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
