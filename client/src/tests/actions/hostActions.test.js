import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { INITIAL_STATE } from '../../reducers/databaseReducer';
import * as actions from '../../actions/hostActions';
import * as dbActions from '../../actions/databaseActions';

const middlewares = [thunk, promise];
const mockStore = configureMockStore(middlewares);

describe('host actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
  });

  test('should create action to disconnect', () => {
    const actionsList = [
      { type: actions.DELETE_QUERY },
      { type: dbActions.DELETE_DATABASE },
      { type: actions.DELETE_QUERIES },
      { type: actions.DELETE_HOST },
    ];

    store.dispatch(actions.disconnect());

    expect(store.getActions()).toEqual(actionsList);
  });
});
