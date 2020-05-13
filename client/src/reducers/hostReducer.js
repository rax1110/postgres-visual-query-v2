import { UPDATE_HOST, DELETE_HOST, CONNECT_ERROR, CONNECTING, CONNECTED } from '../actions/hostActions';

export const INITIAL_STATE = {
  host: '',
  port: 8080,
  database: '',
  user: '',
  password: '',
  error: '',
  connected: false,
  connecting: false,
};

export const hostReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_HOST: {
      return {
        ...state,
        host: action.payload.host,
        port: action.payload.port,
        database: action.payload.database,
        user: action.payload.user,
        password: action.payload.password,
      };
    }
    case DELETE_HOST: {
      return {
        ...INITIAL_STATE,
      };
    }
    case CONNECT_ERROR: {
      return {
        ...state,
        error: action.payload,
        connecting: false,
      };
    }
    case CONNECTED: {
      return {
        ...state,
        connected: true,
        connecting: false,
      };
    }
    case CONNECTING: {
      return {
        ...state,
        connecting: true,
      };
    }
    default:
      return state;
  }
};
