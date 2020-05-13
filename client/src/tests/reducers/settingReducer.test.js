import { CHANGE_LANGUAGE } from '../../actions/settingsActions';
import { DEFAULT_STATE, settingsReducer } from '../../reducers/settingsReducer';

describe('settings reducer', () => {
  test('reducer return initial state', () => {
    expect(settingsReducer(undefined, {})).toEqual(DEFAULT_STATE);
  });

  test('CHANGE_LANGUAGE changes langauge', () => {
    const language = {};
    const state = settingsReducer(DEFAULT_STATE, {
      type: CHANGE_LANGUAGE,
      payload: language,
    });

    expect(state).toEqual({
      ...DEFAULT_STATE,
      language: {},
    });
  });
});
