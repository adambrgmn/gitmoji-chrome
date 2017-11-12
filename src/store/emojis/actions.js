import fesh from '../../utils/fesh';
import extractScssVars from '../../utils/extract-scss-vars';
import mergeArray from '../../utils/merge-array-of-objects';
import * as storage from '../../utils/storage';
import { EMOJIS_ADD, EMOJIS_FETCHING, EMOJIS_FETCHED } from './constants';
import { messageError } from '../messages/actions';

const STORAGE_KEY = `${process.env.REACT_APP_STORAGE_KEY_PREFIX}-emojis`;

const addEmojis = emojis => ({ type: EMOJIS_ADD, payload: emojis });
const fetchingEmojis = () => ({ type: EMOJIS_FETCHING });
const fetchedEmojis = () => ({ type: EMOJIS_FETCHED });

const fetchEmojisRemote = () => async dispatch => {
  try {
    const { gitmojis } = await fesh(process.env.REACT_APP_GITMOJI_URL);
    const scss = await fesh(process.env.REACT_APP_GITMOJI_COLORS_URL, 'text');
    const colors = extractScssVars(scss);
    const emojis = mergeArray('name', gitmojis, colors);

    dispatch(addEmojis(emojis));
    dispatch(fetchedEmojis());
    await storage.set(STORAGE_KEY, emojis);
  } catch (e) {
    dispatch(messageError(e));
  }
};

const fetchEmojisLocal = () => async dispatch => {
  try {
    const emojis = await storage.get(STORAGE_KEY);

    if (Array.isArray(emojis)) {
      dispatch(addEmojis(emojis));
      dispatch(fetchedEmojis());
    }
  } catch (e) {
    dispatch(messageError(e));
  }
};

const fetchEmojis = () => async dispatch => {
  try {
    dispatch(fetchingEmojis());
    dispatch(fetchEmojisLocal());
    dispatch(fetchEmojisRemote());
  } catch (e) {
    dispatch(messageError(e));
  }
};

export {
  addEmojis,
  fetchingEmojis,
  fetchedEmojis,
  fetchEmojisRemote,
  fetchEmojisLocal,
  fetchEmojis,
};
