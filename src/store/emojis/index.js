import { EMOJIS_ADD, EMOJIS_FETCHING, EMOJIS_FETCHED } from './constants';
import { RESET_STATE } from '../constants';
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';

const initialState = {
  items: [],
  loading: false,
};

const emojis = (state = initialState, action) => {
  switch (action.type) {
    case EMOJIS_ADD:
      return {
        ...state,
        items: uniqWith([...state.items, ...action.payload], isEqual),
      };

    case EMOJIS_FETCHING:
      return {
        ...state,
        loading: true,
      };

    case EMOJIS_FETCHED:
      return {
        ...state,
        loading: false,
      };

    case RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export { emojis as default };
