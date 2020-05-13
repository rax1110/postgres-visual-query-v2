import { hostReducer, INITIAL_STATE } from '../../reducers/hostReducer';

describe('host reducer', () => {
  test('reducer return initial state', () => {
    expect(hostReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  test('UPDATE_HOST sets database host data', () => {
    const state = hostReducer(INITIAL_STATE, {
      type: 'UPDATE_HOST',
      payload: {
        host: 'host.host',
        port: 8080,
        database: 'database',
        user: 'user',
        password: 'password',
      },
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      host: 'host.host',
      port: 8080,
      database: 'database',
      user: 'user',
      password: 'password',
    });
  });

  test('DELETE_HOST deletes all host info', () => {
    let state = hostReducer(INITIAL_STATE, {
      type: 'UPDATE_HOST',
      payload: {
        host: 'host.host',
        port: 8080,
        database: 'database',
        user: 'user',
        password: 'password',
      },
    });

    state = hostReducer(state, {
      type: 'DELETE_HOST',
    });

    expect(state).toEqual(INITIAL_STATE);
  });

  test('CONNECT_ERROR adds connection error to state', () => {
    const error = {
      message: 'Error: Connection timed out (code: ETIMEDOUT)',
    };
    const state = hostReducer(INITIAL_STATE, {
      type: 'CONNECT_ERROR',
      payload: error,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      error,
    });
  });
});
