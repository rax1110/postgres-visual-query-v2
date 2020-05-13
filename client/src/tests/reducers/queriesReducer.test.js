import { INITIAL_STATE } from '../../reducers/queryReducer';
import { queriesReducer } from '../../reducers/queriesReducer';

const queries = [
  {
    id: 0,
    queryName: 'Main',
  },
  {
    id: 2,
    queryName: 'Query 2',
  },
];

describe('queries reducer', () => {
  test('reducer returns initial state', () => {
    expect(queriesReducer(undefined, {})).toEqual([]);
  });

  test('ADD_QUERY adds new query', () => {
    const state = queriesReducer([], {
      type: 'ADD_QUERY',
    });

    const newQuery = {
      ...INITIAL_STATE,
      id: 1,
    };

    expect(state).toEqual([newQuery]);
  });

  test('ADD_QUERY adds multiple queries', () => {
    let state = queriesReducer([], {
      type: 'ADD_QUERY',
    });

    state = queriesReducer(state, {
      type: 'ADD_QUERY',
      payload: { activeQueryId: 3 },
    });

    const query1 = {
      ...INITIAL_STATE,
      id: 1,
    };

    const query2 = {
      ...INITIAL_STATE,
      id: 4,
    };

    expect(state).toEqual([query1, query2]);
  });

  test('UPDATE_QUERY updates queries so that new active query is not present in queries'
    + ' and last active is added to queries', () => {
    const lastActiveQuery = {
      id: 1,
      queryName: 'Query 1',
    };

    const expectedNewQueriesState = [
      {
        id: 0,
        queryName: 'Main',
      },
      {
        id: 1,
        queryName: 'Query 1',
      },
    ];

    const state = queriesReducer(queries, {
      type: 'UPDATE_QUERIES',
      payload: { lastQuery: lastActiveQuery, activeQueryId: 2 },
    });

    expect(state).toEqual(expectedNewQueriesState);
  });

  test('REMOVE_MAIN_FROM_QUERIES removes main query from queries list', () => {
    const queriesWithMain = [
      {
        id: 2,
        queryName: 'Query 2',
      },
      {
        id: 0,
        queryName: 'Main',
      },
      {
        id: 1,
        queryName: 'Query 1',
      },
    ];

    const expectedResult = [
      {
        id: 2,
        queryName: 'Query 2',
      },
      {
        id: 1,
        queryName: 'Query 1',
      },
    ];

    const state = queriesReducer(queriesWithMain, {
      type: 'REMOVE_MAIN_FROM_QUERIES',
    });

    expect(state).toEqual(expectedResult);
  });

  test('DELETE_QUERIES removes all queries', () => {
    const state = queriesReducer(queries, {
      type: 'DELETE_QUERIES',
    });

    expect(state).toEqual([]);
  });
});
