import axios from 'axios';
import {
  CONNECT_ERROR, CONNECTED, CONNECTING, UPDATE_HOST,
} from './hostActions';
import axiosClient from '../utils/axiosClient';
import { encrypt } from '../utils/encrypt';

export const ADD_TABLES = 'ADD_TABLES';
export const ADD_COLUMNS = 'ADD_COLUMNS';
export const ADD_CONSTRAINTS = 'ADD_CONSTRAINTS';
export const CHANGE_SELECTED_SCHEMA = 'CHANGE_SELECTED_SCHEMA';
export const UPDATE_SEARCH_EXPR = 'UPDATE_SEARCH_EXPR';
export const DELETE_DATABASE = 'DELETE_DATABASE';

export const connectToDatabase = state => (dispatch) => {
  dispatch({ type: CONNECTING });

  const hostInfo = {
    host: state.host,
    port: state.port,
    database: state.database,
    user: state.user,
    password: encrypt(state.password),
  };

  axios.all([
    axiosClient.post('/database/tables', hostInfo),
    axiosClient.post('/database/columns', hostInfo),
    axiosClient.post('/database/constraints', hostInfo)])
    .then(axios.spread((tables, columns, constraints) => {
      dispatch({ type: ADD_TABLES, payload: tables.data.rows });
      dispatch({ type: ADD_COLUMNS, payload: columns.data.rows });
      dispatch({ type: ADD_CONSTRAINTS, payload: constraints.data.rows });
      dispatch({ type: CONNECTED });
      dispatch({ type: UPDATE_HOST, payload: hostInfo });
    })).catch((error) => {
      dispatch({ type: CONNECT_ERROR, payload: error.toString() });
    });
};

export const changeSelectedSchema = schema => ({ type: CHANGE_SELECTED_SCHEMA, payload: schema });

export const search = expr => ({ type: UPDATE_SEARCH_EXPR, payload: expr });
