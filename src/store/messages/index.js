import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';
import { MESSAGE_SUCCESS, MESSAGE_ERROR, MESSAGE_REMOVE } from './constants';

const initialState = [];

const createUniqueList = (newItem, state) => {
  const newList = uniqWith([newItem, ...state], isEqual);
  if (isEqual(newList, state)) return state;
  return newList;
};

const messages = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_SUCCESS:
      return createUniqueList(
        {
          type: MESSAGE_SUCCESS,
          message: action.payload.message,
          icon: action.payload.icon,
        },
        state,
      );

    case MESSAGE_ERROR:
      return createUniqueList(
        {
          type: MESSAGE_ERROR,
          message: action.payload.message,
          icon: action.payload.icon,
        },
        state,
      );

    case MESSAGE_REMOVE:
      return state.filter(m => m.message !== action.payload.message);

    default:
      return state;
  }
};

export { messages as default };
