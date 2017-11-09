import fesh from '../../utils/fesh';
import extractScssVars from '../../utils/extract-scss-vars';
import mergeWithColors from '../../utils/merge-with-colors';
import * as storage from '../../utils/storage';
import { EMOJIS_ADD, EMOJIS_FETCHING, EMOJIS_FETCHED } from './constants';

const addEmojis = emojis => ({ type: EMOJIS_ADD, payload: emojis });
const fetchingEmojis = () => ({ type: EMOJIS_FETCHING });
const fetchedEmojis = () => ({ type: EMOJIS_FETCHED });

const fetchEmojisRemote = () => async dispatch => {
  try {
    const { gitmojis } = await fesh(
      'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json',
    );
    const scss = await fesh(
      'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/styles/_includes/_vars.scss',
      'text',
    );
    const colors = extractScssVars(scss);
    const emojis = mergeWithColors(gitmojis, colors);

    dispatch(addEmojis(emojis));
    dispatch(fetchedEmojis());
    await storage.set('gitmoji-emojis', emojis);
  } catch (e) {
    console.error(e.message);
  }
};

const fetchEmojisLocal = () => async dispatch => {
  try {
    const emojis = await storage.get('gitmoji-emojis');

    dispatch(addEmojis(emojis));
    dispatch(fetchedEmojis());
  } catch (e) {
    console.error(e.message);
  }
};

const fetchEmojis = () => async dispatch => {
  try {
    dispatch(fetchingEmojis());
    dispatch(fetchEmojisLocal());
    dispatch(fetchEmojisRemote());
  } catch (e) {
    console.error(e.message);
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
