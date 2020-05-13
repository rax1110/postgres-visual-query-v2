import moxios from 'moxios';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import configureMockStore from 'redux-mock-store';
import axiosClient from '../../utils/axiosClient';
import * as actions from '../../actions/databaseActions';
import { INITIAL_STATE } from '../../reducers/databaseReducer';
import { CONNECTING } from '../../actions/hostActions';

const middlewares = [thunk, promise];
const mockStore = configureMockStore(middlewares);

describe('database actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    moxios.install(axiosClient);
  });

  afterEach(() => moxios.uninstall(axiosClient));

  test('should create an action to update search expression', () => {
    const expr = '#BASE_TABLE';
    const action = {
      type: actions.UPDATE_SEARCH_EXPR,
      payload: expr,
    };

    expect(actions.search(expr)).toEqual(action);
  });

  test('should create an action to change selected schema', () => {
    const schema = 'public';
    const action = {
      type: actions.CHANGE_SELECTED_SCHEMA,
      payload: schema,
    };

    expect(actions.changeSelectedSchema(schema)).toEqual(action);
  });

  test('should create an action to connect to database', () => {
    const payload = {
      host: 'test',
      port: 1234,
      database: 'test',
      user: 'test',
      password: 'test',
      toQuery: false };

    const action = { type: CONNECTING };
    const fn = actions.connectToDatabase(payload);

    fn((receivedAction) => {
      expect(receivedAction).toEqual(action);
    });
  });
});
