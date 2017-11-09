import { MESSAGE_SUCCESS, MESSAGE_ERROR } from './constants';

const initialState = [];

const messages = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_SUCCESS:
      return [{
        type: MESSAGE_SUCCESS,
        message: action.payload.message,
        icon: action.payload.icon,
      }, ...state];

    case MESSAGE_ERROR:
    return [{
      type: MESSAGE_ERROR,
      message: action.payload.message,
      icon: action.payload.icon,
    }, ...state];

    default:
      return state;
  }
};

export { messages as default };
