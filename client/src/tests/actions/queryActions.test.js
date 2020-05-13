import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import moxios from 'moxios';
import * as actions from '../../actions/queryActions';
import axiosClient from '../../utils/axiosClient';

const middlewares = [thunk, promise];
const mockStore = configureMockStore(middlewares);
const INITIAL_STATE = {
  columns: [],
  tables: [],
  distinct: false,
  sql: '',
  result: null,
  joins: [],
  error: null,
};

describe('query actions', () => {
  let store;

  // set up a fake store for all our tests
  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    moxios.install(axiosClient);
  });

  afterEach(() => moxios.uninstall(axiosClient));

  test('should create an action to delete query', () => {
    const action = {
      type: actions.DELETE_QUERY,
    };

    store.dispatch(actions.deleteQuery());

    expect(store.getActions()).toContainEqual(action);
  });

  test('should create an action to add column', () => {
    const actionList = [
      {
        type: actions.ADD_COLUMN,
        payload: {},
      },
      {
        type: actions.GENERATE_SQL,
      },
    ];

    store.dispatch(actions.addColumn({}));

    expect(store.getActions()).toContainEqual(actionList[0]);
    expect(store.getActions()).toContainEqual(actionList[1]);
  });

  test('should create an action to switch distinct', () => {
    const actionList = [
      {
        type: actions.SWITCH_DISTINCT,
      },
      {
        type: actions.GENERATE_SQL,
      },
    ];

    store.dispatch(actions.switchDistinct());

    expect(store.getActions()).toContainEqual(actionList[0]);
    expect(store.getActions()).toContainEqual(actionList[1]);
  });

  test('should create an action to add table', () => {
    const actionList = [
      {
        type: actions.ADD_TABLE,
        payload: {},
      },
      {
        type: actions.GENERATE_SQL,
      },
    ];

    store.dispatch(actions.addTable({}));

    expect(store.getActions()).toContainEqual(actionList[0]);
    expect(store.getActions()).toContainEqual(actionList[1]);
  });

  test('should create an action to remove table', () => {
    const actionList = [
      {
        type: actions.REMOVE_TABLE,
        payload: {},
      },
      {
        type: actions.GENERATE_SQL,
      },
    ];

    store.dispatch(actions.removeTable({}));

    expect(store.getActions()).toContainEqual(actionList[0]);
    expect(store.getActions()).toContainEqual(actionList[1]);
  });

  test('should create an action to update column', () => {
    const actionList = [
      {
        type: actions.UPDATE_COLUMN,
        payload: {},
      },
      {
        type: actions.GENERATE_SQL,
      },
    ];

    store.dispatch(actions.updateColumn({}));

    expect(store.getActions()).toContainEqual(actionList[0]);
    expect(store.getActions()).toContainEqual(actionList[1]);
  });

  test('should create an action to update columns order', () => {
    const actionList = [
      {
        type: actions.UPDATE_COLUMNS_ORDER,
        payload: [],
      },
      {
        type: actions.GENERATE_SQL,
      },
    ];

    store.dispatch(actions.updateColumnsOrder([]));

    expect(store.getActions()).toContainEqual(actionList[0]);
    expect(store.getActions()).toContainEqual(actionList[1]);
  });

  test('should create an action to update table', () => {
    const actionList = [
      {
        type: actions.UPDATE_TABLE,
        payload: {},
      },
      {
        type: actions.GENERATE_SQL,
      },
    ];

    store.dispatch(actions.updateTable({}));

    expect(store.getActions()).toContainEqual(actionList[0]);
    expect(store.getActions()).toContainEqual(actionList[1]);
  });

  test('should create an action to update joins order', () => {
    const actionList = [
      {
        type: actions.UPDATE_JOINS_ORDER,
        payload: [],
      },
      {
        type: actions.GENERATE_SQL,
      },
    ];

    store.dispatch(actions.updateJoinsOrder([]));

    expect(store.getActions()).toContainEqual(actionList[0]);
    expect(store.getActions()).toContainEqual(actionList[1]);
  });

  test('should create an action to add join', () => {
    const action = {
      type: actions.ADD_JOIN,
    };

    store.dispatch(actions.addJoin({}));

    expect(store.getActions()).toContainEqual(action);
  });

  test('should create an action to update join', () => {
    const actionList = [
      {
        type: actions.UPDATE_JOIN,
        payload: {},
      },
      {
        type: actions.GENERATE_SQL,
      },
    ];

    store.dispatch(actions.updateJoin({}));

    expect(store.getActions()).toContainEqual(actionList[0]);
    expect(store.getActions()).toContainEqual(actionList[1]);
  });

  test('should create an action to remove join', () => {
    const actionList = [
      {
        type: actions.REMOVE_JOIN,
        payload: {},
      },
      {
        type: actions.GENERATE_SQL,
      },
    ];

    store.dispatch(actions.removeJoin({}));

    expect(store.getActions()).toContainEqual(actionList[0]);
    expect(store.getActions()).toContainEqual(actionList[1]);
  });

  test('should create an action to remove column', () => {
    const actionList = [
      {
        type: actions.REMOVE_COLUMN,
        payload: {},
      },
      {
        type: actions.GENERATE_SQL,
      },
    ];

    store.dispatch(actions.removeColumn({}));

    expect(store.getActions()).toContainEqual(actionList[0]);
    expect(store.getActions()).toContainEqual(actionList[1]);
  });

  test('should create an action to query database', (done) => {
    const action = {
      type: actions.ADD_RESULT,
      payload: {},
    };

    store.dispatch(actions.queryAction({})).then(() => {
      expect(store.getActions()).toContainEqual(action);
    });

    done();
  });

  test('should create an action to add join', () => {
    const action = {
      type: actions.ADD_JOIN,
    };

    store.dispatch(actions.addJoin({}));

    expect(store.getActions()).toContainEqual(action);
  });

  test('should create an action update column operand', () => {
    const actionList = [
      {
        type: actions.UPDATE_COLUMN_OPERAND,
        payload: { operand: {}, id: {} },
      },
      {
        type: actions.GENERATE_SQL,
      },
    ];

    store.dispatch(actions.updateColumnOperand({}, {}));

    expect(store.getActions()).toContainEqual(actionList[0]);
    expect(store.getActions()).toContainEqual(actionList[1]);
  });

  test('should create an action to update sql', () => {
    const action = {
      type: actions.UPDATE_SQL,
      payload: { sqlString: {} },
    };

    store.dispatch(actions.updateSql({}));

    expect(store.getActions()).toContainEqual(action);
  });

  test('should create an action to set new active query', () => {
    const action = {
      type: actions.SET_ACTIVE_QUERY,
      payload: {},
    };

    store.dispatch(actions.setActiveQuery({}));

    expect(store.getActions()).toContainEqual(action);
  });

  test('should create an action to switch limit value', () => {
    const actionList = [
      {
        type: actions.SWITCH_LIMIT,
      },
      {
        type: actions.GENERATE_SQL,
      },
    ];

    store.dispatch(actions.switchLimit({}));

    expect(store.getActions()).toContainEqual(actionList[0]);
    expect(store.getActions()).toContainEqual(actionList[1]);
  });

  test('should create an action to set limit value', () => {
    const actionList = [
      {
        type: actions.SET_LIMIT_VALUE,
        payload: { limitValue: {} },
      },
      {
        type: actions.GENERATE_SQL,
      },
    ];

    store.dispatch(actions.setLimitValue({}));

    expect(store.getActions()).toContainEqual(actionList[0]);
    expect(store.getActions()).toContainEqual(actionList[1]);
  });

  test('should create an action to update query validity', () => {
    const action = {
      type: actions.UPDATE_VALIDITY,
      payload: { isValid: {} },
    };

    store.dispatch(actions.updateValidity({}));

    expect(store.getActions()).toContainEqual(action);
  });

  test('should create an action to add new set', () => {
    const action = {
      type: actions.ADD_SET,
    };

    store.dispatch(actions.addSet({}));

    expect(store.getActions()).toContainEqual(action);
  });

  test('should create an action to update set', () => {
    const actionList = [
      {
        type: actions.UPDATE_SET,
        payload: {},
      },
      {
        type: actions.GENERATE_SQL,
      },
    ];

    store.dispatch(actions.updateSet({}));

    expect(store.getActions()).toContainEqual(actionList[0]);
    expect(store.getActions()).toContainEqual(actionList[1]);
  });

  test('should create an action to remove set', () => {
    const actionList = [
      {
        type: actions.REMOVE_SET,
        payload: {},
      },
      {
        type: actions.GENERATE_SQL,
      },
    ];

    store.dispatch(actions.removeSet({}));

    expect(store.getActions()).toContainEqual(actionList[0]);
    expect(store.getActions()).toContainEqual(actionList[1]);
  });

  test('should create an action to update sets order', () => {
    const actionList = [
      {
        type: actions.UPDATE_SETS_ORDER,
        payload: {},
      },
      {
        type: actions.GENERATE_SQL,
      },
    ];

    store.dispatch(actions.updateSetsOrder({}));

    expect(store.getActions()).toContainEqual(actionList[0]);
    expect(store.getActions()).toContainEqual(actionList[1]);
  });
});
