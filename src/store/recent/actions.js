import { RECENT_ADD } from './constants';
import * as storage from '../../utils/storage';

const addRecentAction = emoji => ({ type: RECENT_ADD, payload: emoji });

const addRecent = emoji => async (dispatch, getState) => {
  try {
    const action = addRecentAction(emoji);
    dispatch(action);
    const recentEmojis = getState().recent;
    await storage.set('gitmoji-recent', recentEmojis);
  } catch (e) {
    console.error(e.message);
  }
};

const getRecent = () => async dispatch => {
  try {
    const recentEmojis = await storage.get('gitmoji-recent');
    recentEmojis.map(addRecentAction).forEach(dispatch);
  } catch (e) {
    console.error(e.message);
  }
};

export { addRecent, getRecent };
