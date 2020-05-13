import { CHANGE_LANGUAGE } from '../actions/settingsActions';

export const DEFAULT_STATE = {
  language: { code: 'eng', name: 'English' },
};

export const settingsReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};
