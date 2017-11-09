import { RECENT_ADD } from './constants';
import * as storage from '../../utils/storage';
import { messageError } from '../messages/actions';

const addRecentAction = emoji => ({ type: RECENT_ADD, payload: emoji });

const addRecent = emoji => async (dispatch, getState) => {
  try {
    const action = addRecentAction(emoji);
    dispatch(action);

    const recentEmojis = getState().recent;
    await storage.set('gitmoji-recent', recentEmojis);
  } catch (e) {
    dispatch(messageError(e));
  }
};

const getRecent = () => async dispatch => {
  try {
    const recentEmojis = await storage.get('gitmoji-recent');

    if (Array.isArray(recentEmojis)) {
      recentEmojis.map(addRecentAction).forEach(dispatch);
    }
  } catch (e) {
    dispatch(messageError(e));
  }
};

export { addRecent, getRecent };
