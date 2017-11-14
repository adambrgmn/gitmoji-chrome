import { RECENT_ADD } from './constants';
import { RESET_STATE } from '../constants';

const initialState = [];

const recent = (state = initialState, action) => {
  switch (action.type) {
    case RECENT_ADD:
      return [action.payload, ...state];

    case RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export { recent as default };
