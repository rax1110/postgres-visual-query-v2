import axiosClient from '../utils/axiosClient';

export const ADD_COLUMN = 'ADD_COLUMN';
export const GENERATE_SQL = 'GENERATE_SQL';
export const SWITCH_DISTINCT = 'SWITCH_DISTINCT';
export const ADD_TABLE = 'ADD_TABLE';
export const REMOVE_TABLE = 'REMOVE_TABLE';
export const UPDATE_COLUMN = 'UPDATE_COLUMN';
export const UPDATE_COLUMNS_ORDER = 'UPDATE_COLUMNS_ORDER';
export const UPDATE_TABLE = 'UPDATE_TABLE';
export const UPDATE_JOINS_ORDER = 'UPDATE_JOINS_ORDER';
export const ADD_RESULT = 'ADD_RESULT';
export const ADD_JOIN = 'ADD_JOIN';
export const UPDATE_JOIN = 'UPDATE_JOIN';
export const REMOVE_JOIN = 'REMOVE_JOIN';
export const REMOVE_COLUMN = 'REMOVE_COLUMN';
export const DELETE_QUERY = 'DELETE_QUERY';
export const QUERYING = 'QUERYING';
export const UPDATE_COLUMN_OPERAND = 'UPDATE_COLUMN_OPERAND';
export const UPDATE_SQL = 'UPDATE_SQL';
export const SET_ACTIVE_QUERY = 'SET_ACTIVE_QUERY';
export const SWITCH_LIMIT = 'SWITCH_LIMIT';
export const SET_LIMIT_VALUE = 'SET_LIMIT_VALUE';
export const ADD_SET = 'ADD_SET';
export const UPDATE_SET = 'UPDATE_SET';
export const REMOVE_SET = 'REMOVE_SET';
export const UPDATE_SETS_ORDER = 'UPDATE_SETS_ORDER';
export const UPDATE_VALIDITY = 'UPDATE_VALIDITY';

export const addColumn = data => (dispatch) => {
  dispatch({ type: ADD_COLUMN, payload: data });
  dispatch({ type: GENERATE_SQL });
};

export const switchDistinct = () => (dispatch) => {
  dispatch({ type: SWITCH_DISTINCT });
  dispatch({ type: GENERATE_SQL });
};

export const addTable = data => (dispatch) => {
  dispatch({ type: ADD_TABLE, payload: data });
  dispatch({ type: GENERATE_SQL });
};

export const removeTable = data => (dispatch) => {
  dispatch({ type: REMOVE_TABLE, payload: data });
  dispatch({ type: GENERATE_SQL });
};

export const updateColumn = data => (dispatch) => {
  dispatch({ type: UPDATE_COLUMN, payload: data });
  dispatch({ type: GENERATE_SQL });
};

export const updateColumnOperand = (operand, id) => (dispatch) => {
  dispatch({ type: UPDATE_COLUMN_OPERAND, payload: { operand, id } });
  dispatch({ type: GENERATE_SQL });
};

export const updateColumnsOrder = data => (dispatch) => {
  dispatch({ type: UPDATE_COLUMNS_ORDER, payload: data });
  dispatch({ type: GENERATE_SQL });
};

export const updateTable = data => (dispatch) => {
  dispatch({ type: UPDATE_TABLE, payload: data });
  dispatch({ type: GENERATE_SQL });
};

export const updateJoinsOrder = data => (dispatch) => {
  dispatch({ type: UPDATE_JOINS_ORDER, payload: data });
  dispatch({ type: GENERATE_SQL });
};

export const queryAction = state => ({
  type: ADD_RESULT,
  payload: axiosClient.post('/query/query', {
    host: state.host,
    port: state.port,
    database: state.database,
    user: state.user,
    password: state.password,
    sql: state.sql,
  }),
});

export const query = state => (dispatch) => {
  dispatch({ type: QUERYING });
  dispatch(queryAction(state));
};

export const addJoin = () => ({ type: ADD_JOIN });

export const updateJoin = data => (dispatch) => {
  dispatch({ type: UPDATE_JOIN, payload: data });
  dispatch({ type: GENERATE_SQL });
};

export const removeJoin = data => (dispatch) => {
  dispatch({ type: REMOVE_JOIN, payload: data });
  dispatch({ type: GENERATE_SQL });
};

export const removeColumn = data => (dispatch) => {
  dispatch({ type: REMOVE_COLUMN, payload: data });
  dispatch({ type: GENERATE_SQL });
};

export const deleteQuery = () => ({ type: DELETE_QUERY });

export const updateSql = sqlString => ({ type: UPDATE_SQL, payload: { sqlString } });

export const setActiveQuery = data => ({ type: SET_ACTIVE_QUERY, payload: data });

export const switchLimit = () => (dispatch) => {
  dispatch({ type: SWITCH_LIMIT });
  dispatch({ type: GENERATE_SQL });
};

export const setLimitValue = limitValue => (dispatch) => {
  dispatch({ type: SET_LIMIT_VALUE, payload: { limitValue } });
  dispatch({ type: GENERATE_SQL });
};

export const updateValidity = isValid => ({ type: UPDATE_VALIDITY, payload: { isValid } });

export const addSet = () => ({ type: ADD_SET });

export const updateSet = data => (dispatch) => {
  dispatch({ type: UPDATE_SET, payload: data });
  dispatch({ type: GENERATE_SQL });
};

export const removeSet = data => (dispatch) => {
  dispatch({ type: REMOVE_SET, payload: data });
  dispatch({ type: GENERATE_SQL });
};

export const updateSetsOrder = data => (dispatch) => {
  dispatch({ type: UPDATE_SETS_ORDER, payload: data });
  dispatch({ type: GENERATE_SQL });
};
