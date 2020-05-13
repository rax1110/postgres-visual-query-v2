import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import * as actions from '../../actions/queriesActions';

const middlewares = [thunk, promise];
const mockStore = configureMockStore(middlewares);

describe('queries actions', () => {
  let store;

  // set up a fake store for all our tests
  beforeEach(() => {
    store = mockStore({});
  });

  test('should create an action to add query', () => {
    const action = {
      type: actions.ADD_QUERY,
      payload: { activeQueryId: 2 },
    };

    store.dispatch(actions.addQuery(2));

    expect(store.getActions()).toContainEqual(action);
  });

  test('should create an action to update query', () => {
    const action = {
      type: actions.UPDATE_QUERIES,
      payload: { lastQuery: {}, activeQueryId: {} },
    };

    store.dispatch(actions.updateQueries({}, {}));

    expect(store.getActions()).toContainEqual(action);
  });

  test('should create an action to remove main query from queries', () => {
    const action = {
      type: actions.REMOVE_MAIN_FROM_QUERIES,
    };

    store.dispatch(actions.removeMainFromQueries());

    expect(store.getActions()).toContainEqual(action);
  });
});
