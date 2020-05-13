import testData from '../data/testDatabaseTables.json';
import { databaseReducer, INITIAL_STATE } from '../../reducers/databaseReducer';

describe('database reducer', () => {
  test('reducer return initial state', () => {
    expect(databaseReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  test('ADD_TABLES without public schema', () => {
    const state = databaseReducer(INITIAL_STATE, {
      type: 'ADD_TABLES',
      payload: testData.test_tables_without_public,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      tables: testData.test_tables_without_public,
      selectedSchema: 'information_schema',
      schemas: ['information_schema'],
    });
  });

  test('ADD_TABLES with public schema', () => {
    const state = databaseReducer(INITIAL_STATE, {
      type: 'ADD_TABLES',
      payload: testData.test_tables_with_public,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      tables: testData.test_tables_with_public,
      selectedSchema: 'public',
      schemas: ['information_schema', 'public'],
    });
  });

  test('ADD_TABLES override old tables', () => {
    let state = databaseReducer(INITIAL_STATE, {
      type: 'ADD_TABLES',
      payload: testData.test_tables_without_public,
    });

    state = databaseReducer(state, {
      type: 'ADD_TABLES',
      payload: testData.test_tables_with_public,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      tables: testData.test_tables_with_public,
      selectedSchema: 'public',
      schemas: ['information_schema', 'public'],
    });
  });

  test('ADD_COLUMNS adds columns', () => {
    const state = databaseReducer(INITIAL_STATE, {
      type: 'ADD_COLUMNS',
      payload: testData.test_columns,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      columns: testData.test_columns,
    });
  });

  test('ADD_CONSTRAINTS adds constraints', () => {
    const state = databaseReducer(INITIAL_STATE, {
      type: 'ADD_CONSTRAINTS',
      payload: testData.test_constraints,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      constraints: testData.test_constraints,
    });
  });

  test('DELETE_DATABASE resets state', () => {
    let state = databaseReducer(INITIAL_STATE, {
      type: 'ADD_COLUMNS',
      payload: testData.test_columns,
    });

    state = databaseReducer(state, {
      type: 'DELETE_DATABASE',
    });

    expect(state).toEqual(INITIAL_STATE);
  });

  test('CONNECTED does not switch with multiple executions', () => {
    let state;
    
    state = databaseReducer(INITIAL_STATE, {
      type: 'CONNECTED',
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
    });
  });

  test('UPDATE_SEARCH_EXPR sets expression', () => {
    const expr = 'table_name';
    const state = databaseReducer(INITIAL_STATE, {
      type: 'UPDATE_SEARCH_EXPR',
      payload: expr,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      searchExpr: expr,
    });
  });

  test('CHANGE_SELECTED_SCHEMA changes selected schema', () => {
    const expr = 'table_schema';
    const state = databaseReducer(INITIAL_STATE, {
      type: 'CHANGE_SELECTED_SCHEMA',
      payload: expr,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      selectedSchema: expr,
    });
  });
});
