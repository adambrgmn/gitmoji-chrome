import { RECENT_ADD } from './constants';
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';

const takeRecent = recentEmojis => {
  const unique = uniqWith(recentEmojis, isEqual);
  return unique.slice(0, 5);
};

const initialState = [];

const recent = (state = initialState, action) => {
  switch (action.type) {
    case RECENT_ADD:
      return takeRecent([action.payload, ...state]);

    default:
      return state;
  }
};

export { recent as default };
