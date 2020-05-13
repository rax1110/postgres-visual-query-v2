import { INITIAL_STATE, queryReducer } from '../../reducers/queryReducer';

describe('query reducer', () => {
  test('reducer return initial state', () => {
    expect(queryReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  test('ADD_RESULT_REJECTED adds query error to state', () => {
    const payload = {
      response: {
        data: {
          message: 'column room_id does not exist',
          code: '42703',
          position: '22',
        },
      },
    };

    const state = queryReducer(INITIAL_STATE, {
      type: 'ADD_RESULT_REJECTED',
      payload,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      error: payload.response.data,
    });
  });

  test('ADD_COLUMN add one column', () => {
    const column = {
      table_name: 'table_name',
      table_schema: 'table_schema',
      table_alias: 'table_alias',
      column_name: 'column_name',
    };

    const columnResult = {
      column_aggregate: '',
      column_alias: '',
      column_distinct_on: false,
      column_filter: '',
      column_group_by: false,
      column_name: 'column_name',
      column_order: false,
      column_order_dir: true,
      display_in_query: true,
      column_filter_operand: '',
      filter_as_having: false,
      subquerySql: '',
      subqueryId: 0,
      id: 1,
      table_alias: 'table_alias',
      table_name: 'table_name',
      table_schema: 'table_schema',
    };

    const state = queryReducer(INITIAL_STATE, {
      type: 'ADD_COLUMN',
      payload: column,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      columns: [columnResult],
      lastColumnId: 1,
    });
  });

  test('ADD_COLUMN add two columns', () => {
    const column = {
      table_name: 'table_name',
      table_schema: 'table_schema',
      table_alias: 'table_alias',
      column_name: 'column_name',
    };

    const columnResult = {
      column_aggregate: '',
      column_alias: '',
      column_distinct_on: false,
      column_filter: '',
      column_group_by: false,
      column_name: 'column_name',
      column_order: false,
      column_order_dir: true,
      display_in_query: true,
      column_filter_operand: '',
      filter_as_having: false,
      subquerySql: '',
      subqueryId: 0,
      id: 1,
      table_alias: 'table_alias',
      table_name: 'table_name',
      table_schema: 'table_schema',
    };

    const columnResult2 = {
      column_aggregate: '',
      column_alias: 'column_name_1',
      column_distinct_on: false,
      column_filter: '',
      column_group_by: false,
      column_name: 'column_name',
      column_order: false,
      column_order_dir: true,
      display_in_query: true,
      column_filter_operand: '',
      filter_as_having: false,
      subquerySql: '',
      subqueryId: 0,
      id: 2,
      table_alias: 'table_alias',
      table_name: 'table_name',
      table_schema: 'table_schema',
    };

    let state = queryReducer(INITIAL_STATE, {
      type: 'ADD_COLUMN',
      payload: column,
    });

    state = queryReducer(state, {
      type: 'ADD_COLUMN',
      payload: column,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      columns: [columnResult, columnResult2],
      lastColumnId: 2,
    });
  });

  test('UPDATE_COLUMN updates column', () => {
    const column = {
      table_name: 'table_name',
      table_schema: 'table_schema',
      table_alias: '',
      column_name: 'column_name',
    };

    let state = {
      ...INITIAL_STATE,
      columns: [column],
    };

    column.table_alias = 'table_alias';

    state = queryReducer(state, {
      type: 'UPDATE_COLUMN',
      payload: column,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      columns: [column],
    });
  });

  test('UPDATE_COLUMN does not update column with wrong schema', () => {
    const columnWithWrongSchema = {
      table_name: 'table_name',
      table_schema: 'table_schema2',
      table_alias: '',
      column_name: 'column_name',
    };

    const initialColumn = {
      column_aggregate: '',
      column_alias: '',
      column_distinct_on: false,
      column_filter: '',
      column_group_by: false,
      column_name: 'column_name',
      column_order: false,
      column_order_dir: true,
      display_in_query: true,
      column_filter_operand: '',
      filter_as_having: false,
      subquerySql: '',
      subqueryId: 0,
      id: 1,
      table_alias: 'table_alias',
      table_name: 'table_name',
      table_schema: 'table_schema',
    };

    let state = {
      ...INITIAL_STATE,
      columns: [initialColumn],
    };

    state = queryReducer(state, {
      type: 'UPDATE_COLUMN',
      payload: columnWithWrongSchema,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      columns: [initialColumn],
    });
  });

  test('REMOVE_COLUMN remove column', () => {
    const column = {
      table_name: 'table_name',
      table_schema: 'table_schema',
      table_alias: '',
      column_name: 'column_name',
    };

    let state = {
      ...INITIAL_STATE,
      columns: [column],
    };

    state = queryReducer(state, {
      type: 'REMOVE_COLUMN',
      payload: column,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      columns: [],
    });
  });

  test('REMOVE_COLUMN does not remove column with different schema', () => {
    const initialColumn = {
      column_aggregate: '',
      column_alias: '',
      column_distinct_on: false,
      column_filter: '',
      column_group_by: false,
      column_name: 'column_name',
      column_order: false,
      column_order_dir: true,
      display_in_query: true,
      column_filter_operand: '',
      filter_as_having: false,
      subquerySql: '',
      subqueryId: 0,
      id: 1,
      table_alias: 'table_alias',
      table_name: 'table_name',
      table_schema: 'table_schema',
    };
    const column2 = {
      table_name: 'table_name',
      table_schema: 'table_schema2',
      table_alias: '',
      column_name: 'column_name',
    };

    let state = {
      ...INITIAL_STATE,
      columns: [initialColumn],
    };

    state = queryReducer(state, {
      type: 'REMOVE_COLUMN',
      payload: column2,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      columns: [initialColumn],
    });
  });

  test('UPDATE_COLUMNS_ORDER overwrites columns', () => {
    const columns = [
      {
        table_name: 'table_name',
        table_schema: 'table_schema',
        table_alias: '',
        column_name: 'column_name',
      },
      {
        table_name: 'table_name',
        table_schema: 'table_schema2',
        table_alias: '',
        column_name: 'column_name',
      },
    ];

    const columns2 = [
      {
        table_name: 'table_name',
        table_schema: 'table_schema2',
        table_alias: '',
        column_name: 'column_name',
      },
      {
        table_name: 'table_name',
        table_schema: 'table_schema',
        table_alias: '',
        column_name: 'column_name',
      },
    ];

    let state = {
      ...INITIAL_STATE,
      columns,
    };

    state = queryReducer(state, {
      type: 'UPDATE_COLUMNS_ORDER',
      payload: columns2,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      columns: columns2,
    });
  });

  test('ADD_TABLE add one table', () => {
    const table = {
      table_name: 'table_name',
      table_schema: 'table_schema',
      table_alias: 'table_alias',
    };

    const resultTable = {
      id: 1,
      table_alias: '',
      table_name: 'table_name',
      table_schema: 'table_schema',
    };

    const state = queryReducer(INITIAL_STATE, {
      type: 'ADD_TABLE',
      payload: table,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      tables: [resultTable],
      lastTableId: 1,
    });
  });

  test('ADD_TABLE add two tables', () => {
    const table = {
      table_name: 'table_name',
      table_schema: 'table_schema',
      table_alias: 'table_alias',
    };

    const resultTable = {
      id: 1,
      table_alias: '',
      table_name: 'table_name',
      table_schema: 'table_schema',
    };

    const resultTable2 = {
      id: 2,
      table_alias: 'table_name_1',
      table_name: 'table_name',
      table_schema: 'table_schema',
    };

    let state = queryReducer(INITIAL_STATE, {
      type: 'ADD_TABLE',
      payload: table,
    });

    state = queryReducer(state, {
      type: 'ADD_TABLE',
      payload: table,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      tables: [resultTable, resultTable2],
      lastTableId: 2,
    });
  });

  test('REMOVE_TABLE removes table', () => {
    const table = {
      table_name: 'table_name',
      table_schema: 'table_schema',
      table_alias: 'table_alias',
    };

    let state = {
      ...INITIAL_STATE,
      tables: [table],
    };

    state = queryReducer(state, {
      type: 'REMOVE_TABLE',
      payload: table,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      tables: [],
    });
  });

  test('REMOVE_TABLE removes columns that are from table', () => {
    const table = {
      id: 1,
      table_alias: '',
      table_name: 'table_name',
      table_schema: 'table_schema',
    };

    const columns = [
      {
        table_name: 'table_name',
        table_schema: 'table_schema',
        table_alias: '',
        table_id: 1,
        column_name: 'column_name',
      },
      {
        table_name: 'table_name',
        table_schema: 'table_schema',
        table_alias: '',
        table_id: 1,
        column_name: 'column_name2',
      },
      {
        table_name: 'table_name2',
        table_schema: 'table_schema',
        table_alias: '',
        table_id: 2,
        column_name: 'column_name',
      },
    ];

    let state = {
      ...INITIAL_STATE,
      tables: [table],
      columns,
    };

    state = queryReducer(state, {
      type: 'REMOVE_TABLE',
      payload: table,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      tables: [],
      columns: [{
        table_name: 'table_name2',
        table_schema: 'table_schema',
        table_alias: '',
        table_id: 2,
        column_name: 'column_name',
      }],
    });
  });

  test('REMOVE_TABLE removes join that contain', () => {
    const table = {
      id: 1,
      table_alias: '',
      table_name: 'table_name',
      table_schema: 'table_schema',
    };

    const joins = [
      {
        main_table: {
          table_name: 'table_name',
          table_schema: 'table_schema',
          table_alias: '',
          id: 1,
        },
        on: '',
      },
      {
        main_table: {
          table_name: 'table_name',
          table_schema: 'table_schema',
          table_alias: '',
          id: 1,
        },
        on: '',
      },
    ];

    let state = {
      ...INITIAL_STATE,
      tables: [table],
      joins,
    };

    state = queryReducer(state, {
      type: 'REMOVE_TABLE',
      payload: table,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      tables: [],
      joins: [],
    });
  });

  test('UPDATE_TABLE updates table in table list', () => {
    const table = {
      table_name: 'table_name',
      table_schema: 'table_schema',
      table_alias: '',
    };

    const updatedTable = {
      table_name: 'table_name',
      table_schema: 'table_schema',
      table_alias: 'table_alias',
    };

    let state = {
      ...INITIAL_STATE,
      tables: [table],
    };

    state = queryReducer(state, {
      type: 'UPDATE_TABLE',
      payload: updatedTable,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      tables: [updatedTable],
    });
  });

  test('UPDATE_TABLE updates table aliases in column list', () => {
    const table = {
      table_name: 'table_name',
      table_schema: 'table_schema',
      table_alias: '',
    };

    const updatedTable = {
      table_name: 'table_name',
      table_schema: 'table_schema',
      table_alias: 'table_alias',
    };

    const columns = [
      {
        table_name: 'table_name',
        table_schema: 'table_schema',
        table_alias: '',
        column_name: 'column_name',
      },
      {
        table_name: 'table_name',
        table_schema: 'table_schema',
        table_alias: '',
        column_name: 'column_name2',
      },
    ];

    const updatedColumns = [
      {
        table_name: 'table_name',
        table_schema: 'table_schema',
        table_alias: 'table_alias',
        column_name: 'column_name',
      },
      {
        table_name: 'table_name',
        table_schema: 'table_schema',
        table_alias: 'table_alias',
        column_name: 'column_name2',
      },
    ];

    let state = {
      ...INITIAL_STATE,
      tables: [table],
      columns,
    };

    state = queryReducer(state, {
      type: 'UPDATE_TABLE',
      payload: updatedTable,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      tables: [updatedTable],
      columns: updatedColumns,
    });
  });

  test('UPDATE_TABLE updated table_alias in join list', () => {
    const table = {
      id: 1,
      table_alias: '',
      table_name: 'table_name',
      table_schema: 'table_schema',
    };

    const updatedTable = {
      id: 1,
      table_name: 'table_name',
      table_schema: 'table_schema',
      table_alias: 'table_alias',
    };

    const joins = [
      {
        id: 0,
        type: 'inner',
        color: '#FFFFFF',
        main_table: {
          id: 1,
          table_name: 'table_name',
          table_schema: 'table_schema',
          table_alias: '',
        },
        conditions: [],
      },
      {
        id: 1,
        type: 'inner',
        color: '#FFFFFF',
        main_table: {
          table_name: '',
          table_schema: '',
          table_alias: '',
        },
        conditions: [],
      },
    ];

    const updatedJoins = [
      {
        id: 0,
        type: 'inner',
        color: '#FFFFFF',
        main_table: {
          id: 1,
          table_name: 'table_name',
          table_schema: 'table_schema',
          table_alias: 'table_alias',
        },
        conditions: [],
      },
      {
        id: 1,
        type: 'inner',
        color: '#FFFFFF',
        main_table: {
          table_name: '',
          table_schema: '',
          table_alias: '',
        },
        conditions: [],
      },
    ];

    let state = {
      ...INITIAL_STATE,
      tables: [table],
      joins,
    };

    state = queryReducer(state, {
      type: 'UPDATE_TABLE',
      payload: updatedTable,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      tables: [updatedTable],
      joins: updatedJoins,
    });
  });

  test('SWITCH_DISTINCT switches distinct', () => {
    let state = queryReducer(INITIAL_STATE, {
      type: 'SWITCH_DISTINCT',
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      distinct: true,
    });

    state = queryReducer(state, {
      type: 'SWITCH_DISTINCT',
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      distinct: false,
    });
  });

  test('ADD_JOIN add join', () => {
    const state = queryReducer(INITIAL_STATE, {
      type: 'ADD_JOIN',
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      joins: [{
        id: 0,
        type: 'inner',
        color: state.joins[0].color,
        main_table: {
          table_name: '',
          table_schema: '',
          table_alias: '',
        },
        conditions: [],
      }],
    });
  });

  test('ADD_JOIN add multiple joins', () => {
    let state = queryReducer(INITIAL_STATE, {
      type: 'ADD_JOIN',
    });

    state = queryReducer(state, {
      type: 'ADD_JOIN',
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      joins: [{
        id: 0,
        type: 'inner',
        color: state.joins[0].color,
        main_table: {
          table_name: '',
          table_schema: '',
          table_alias: '',
        },
        conditions: [],
      }, {
        id: 1,
        type: 'inner',
        color: state.joins[1].color,
        main_table: {
          table_name: '',
          table_schema: '',
          table_alias: '',
        },
        conditions: [],
      }],
    });
  });

  test('UPDATE_JOIN update join', () => {
    let state = {
      ...INITIAL_STATE,
      joins: [{
        type: 'inner',
        table_name: '',
        table_schema: '',
        table_alias: '',
        on: '',
        id: 0,
      }],
    };

    const updatedJoin = {
      type: 'inner',
      table_name: 'table_name',
      table_schema: 'table_schema',
      table_alias: '',
      on: '',
      id: 0,
    };

    state = queryReducer(state, {
      type: 'UPDATE_JOIN',
      payload: updatedJoin,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      joins: [updatedJoin],
    });
  });

  test('UPDATE_JOIN update join which does not exist', () => {
    let state = {
      ...INITIAL_STATE,
      joins: [{
        type: 'inner',
        table_name: '',
        table_schema: '',
        table_alias: '',
        on: '',
        id: 0,
      }],
    };

    const incorrectJoin = {
      type: 'inner',
      table_name: 'table_name',
      table_schema: 'table_schema',
      table_alias: '',
      on: '',
      id: 1,
    };

    state = queryReducer(state, {
      type: 'UPDATE_JOIN',
      payload: incorrectJoin,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      joins: [{
        type: 'inner',
        table_name: '',
        table_schema: '',
        table_alias: '',
        on: '',
        id: 0,
      }],
    });
  });

  test('REMOVE_JOIN joins has one join', () => {
    const join = {
      type: 'inner',
      table_name: '',
      table_schema: '',
      table_alias: '',
      on: '',
      id: 0,
    };

    let state = {
      ...INITIAL_STATE,
      joins: [join],
    };

    state = queryReducer(state, {
      type: 'REMOVE_JOIN',
      payload: join,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      joins: [],
    });
  });

  test('REMOVE_JOIN remove join wth correct id', () => {
    const join = {
      type: 'inner',
      table_name: '',
      table_schema: '',
      table_alias: '',
      on: '',
      id: 0,
    };

    const join2 = {
      type: 'inner',
      table_name: '',
      table_schema: '',
      table_alias: '',
      on: '',
      id: 1,
    };

    let state = {
      ...INITIAL_STATE,
      joins: [join, join2],
    };

    state = queryReducer(state, {
      type: 'REMOVE_JOIN',
      payload: join,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      joins: [join2],
    });
  });

  test('ADD_RESULT adds result', () => {
    const payload = {
      data: {
        result: 'result',
      },
    };

    const state = queryReducer(INITIAL_STATE, {
      type: 'ADD_RESULT_FULFILLED',
      payload,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      result: payload.data,
    });
  });

  test('UPDATE_JOINS_ORDER replaces old joins', () => {
    const joins = [{
      type: 'inner',
      table_name: '',
      table_schema: '',
      table_alias: '',
      on: '',
      id: 0,
    }, {
      type: 'inner',
      table_name: '',
      table_schema: '',
      table_alias: '',
      on: '',
      id: 1,
    }];

    const updatedJoins = [{
      type: 'inner',
      table_name: '',
      table_schema: '',
      table_alias: '',
      on: '',
      id: 1,
    }, {
      type: 'inner',
      table_name: '',
      table_schema: '',
      table_alias: '',
      on: '',
      id: 0,
    }];

    let state = {
      ...INITIAL_STATE,
      joins,
    };

    state = queryReducer(state, {
      type: 'UPDATE_JOINS_ORDER',
      payload: updatedJoins,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      joins: updatedJoins,
    });
  });

  test('DELETE_QUERY deletes whole query', () => {
    let state = {
      columns: [{ column: 'column' }],
      tables: [{ table: 'table' }],
      distinct: true,
      sql: 'SELECT',
      result: {},
      joins: [{ join: 'join' }],
      error: {},
    };

    state = queryReducer(state, {
      type: 'DELETE_QUERY',
    });

    expect(state).toEqual(INITIAL_STATE);
  });

  test('UPDATE_COLUMN_OPERAND updates column filter operand', () => {
    const column = {
      id: 1,
      column_filter_operand: 'AND',
    };

    let state = {
      ...INITIAL_STATE,
      columns: [column],
    };

    column.column_filter_operand = 'OR';

    state = queryReducer(state, {
      type: 'UPDATE_COLUMN_OPERAND',
      payload: { operand: column.column_filter_operand, id: column.id },
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      columns: [column],
    });
  });

  test('UPDATE_SQL updates sql', () => {
    const sql = 'SELECT\n * from test1';
    const updatedSql = 'SELECT\n id from test2';

    let state = {
      ...INITIAL_STATE,
      sql,
    };

    state = queryReducer(state, {
      type: 'UPDATE_SQL',
      payload: { sqlString: updatedSql },
    });

    expect(state).toEqual({ ...INITIAL_STATE, sql: updatedSql });
  });

  test('SET_ACTIVE_QUERY sets new active query', () => {
    const query = {
      id: 0,
      queryName: 'Main',
    };

    const newQuery = {
      id: 1,
      queryName: 'Query1',
    };

    let state = {
      ...INITIAL_STATE,
      ...query,
    };

    state = queryReducer(state, {
      type: 'SET_ACTIVE_QUERY',
      payload: newQuery,
    });

    expect(state).toEqual({ ...INITIAL_STATE, ...newQuery });
  });

  test('SWITCH_LIMIT switches limit value', () => {
    let state = queryReducer(INITIAL_STATE, {
      type: 'SWITCH_LIMIT',
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      limit: true,
    });

    state = queryReducer(state, {
      type: 'SWITCH_LIMIT',
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      limit: false,
    });
  });

  test('SET_LIMIT_VALUE sets limit value', () => {
    const limitValue = 0;
    const updatedLimitValue = 45;

    let state = {
      ...INITIAL_STATE,
      limitValue,
    };

    state = queryReducer(state, {
      type: 'SET_LIMIT_VALUE',
      payload: { limitValue: updatedLimitValue },
    });

    expect(state).toEqual({ ...INITIAL_STATE, limitValue: updatedLimitValue });
  });

  test('UPDATE_VALIDITY updates validity of the query', () => {
    const queryValid = false;
    const newQueryValid = true;

    let state = {
      ...INITIAL_STATE,
      queryValid,
    };

    state = queryReducer(state, {
      type: 'UPDATE_VALIDITY',
      payload: { isValid: newQueryValid },
    });

    expect(state).toEqual({ ...INITIAL_STATE, queryValid: newQueryValid });
  });

  test('ADD_SET adds new set', () => {
    const state = queryReducer(INITIAL_STATE, {
      type: 'ADD_SET',
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      sets: [{
        id: 0,
        type: 'union',
        color: state.sets[0].color,
        subquerySql: '',
        subqueryId: 0,
      }],
    });
  });

  test('ADD_SET adds multiple sets', () => {
    let state = queryReducer(INITIAL_STATE, {
      type: 'ADD_SET',
    });

    state = queryReducer(state, {
      type: 'ADD_SET',
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      sets: [{
        id: 0,
        type: 'union',
        color: state.sets[0].color,
        subquerySql: '',
        subqueryId: 0,
      },
      {
        id: 1,
        type: 'union',
        color: state.sets[1].color,
        subquerySql: '',
        subqueryId: 0,
      }],
    });
  });

  test('UPDATE_SET updates sets', () => {
    let state = {
      ...INITIAL_STATE,
      sets: [{
        id: 0,
        type: 'union',
      }],
    };

    const updatedSet = {
      id: 0,
      type: 'intersect',
    };

    state = queryReducer(state, {
      type: 'UPDATE_SET',
      payload: updatedSet,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      sets: [updatedSet],
    });
  });

  test('REMOVE_SET remove set wth correct id', () => {
    const set = {
      id: 0,
      type: 'union',
    };

    const set2 = {
      id: 1,
      type: 'intersect',
    };

    let state = {
      ...INITIAL_STATE,
      sets: [set, set2],
    };

    state = queryReducer(state, {
      type: 'REMOVE_SET',
      payload: set,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      sets: [set2],
    });
  });

  test('UPDATE_SETS_ORDER updates sets order', () => {
    const sets = [{
      id: 0,
      type: 'union',
    }, {
      id: 1,
      type: 'unionall',
    }];

    const updatedSets = [{
      id: 1,
      type: 'unionall',
    }, {
      id: 0,
      type: 'union',
    }];

    let state = {
      ...INITIAL_STATE,
      sets,
    };

    state = queryReducer(state, {
      type: 'UPDATE_SETS_ORDER',
      payload: updatedSets,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      sets: updatedSets,
    });
  });
});
