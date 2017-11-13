import { SETTINGS_TOGGLE_VISIBILITY } from './constants';
import { RESET_STATE } from '../constants';

const initialState = {
  show: false,
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case SETTINGS_TOGGLE_VISIBILITY:
      return {
        ...state,
        show: !state.show,
      };

    case RESET_STATE:
      return { ...initialState, show: state.show };

    default:
      return state;
  }
};

export { settings as default };
