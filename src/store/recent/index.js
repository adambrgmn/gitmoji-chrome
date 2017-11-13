import { RECENT_ADD } from './constants';

const initialState = [];

const recent = (state = initialState, action) => {
  switch (action.type) {
    case RECENT_ADD:
      return [action.payload, ...state];

    default:
      return state;
  }
};

export { recent as default };
