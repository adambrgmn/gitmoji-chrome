import unique from '../../utils/unique';
import { EMOJIS_ADD, EMOJIS_FETCHING, EMOJIS_FETCHED } from './constants';

const initialState = {
  items: [],
  loading: false,
};

const emojis = (state = initialState, action) => {
  switch (action.type) {
    case EMOJIS_ADD:
      return {
        ...state,
        items: unique([...state.items, ...action.payload]),
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

    default:
      return state;
  }
};

export { emojis as default };
