import uniqBy from 'lodash.uniqby';
import * as storage from './chrome/storage';

const KEYS = {
  recent: `${process.env.STORAGE_KEY_PREFIX}-recent`,
};

const extractScssVariables = scss => {
  const variableRe = /((\w|-)+): \$(\w+),/g;
  const match = {};
  let haveResult = true;

  while (haveResult) {
    const result = variableRe.exec(scss);

    if (result == null || result.length < 1) {
      haveResult = false;
    } else {
      const emojiName = result[1];
      const colorName = result[3];
      const re = new RegExp(`\\$${colorName}\\s?: (#.{6});`, 'g');
      const [, color] = re.exec(scss);

      match[emojiName] = color;
    }
  }

  return match;
};

const fetchGitmojis = async () => {
  const res = await fetch(process.env.GITMOJI_URL);
  if (!res.ok) throw new Error('Error fetching emojis');

  const { gitmojis } = await res.json();
  return gitmojis;
};

const fetchColors = async () => {
  const res = await fetch(process.env.GITMOJI_COLORS_URL);
  if (!res.ok) throw new Error('Error fetching emojis');

  const scss = await res.text();
  const variables = extractScssVariables(scss);
  return variables;
};

const fetchEmojis = async () => {
  const [gitmojis, colors] = await Promise.all([
    fetchGitmojis(),
    fetchColors(),
  ]);

  const emojis = gitmojis.map(e => ({
    ...e,
    color: colors[e.name],
    filterKey: `${e.emoji} ${e.code} ${e.description}`,
  }));

  return emojis;
};

const getRecentEmojis = async () => {
  const { [KEYS.recent]: result } = await storage.get({ [KEYS.recent]: [] });
  return result;
};

const addToRecentEmojis = async emoji => {
  const { [KEYS.recent]: oldEmojis } = await storage.get({ [KEYS.recent]: [] });
  const newEmojis = uniqBy([emoji, ...oldEmojis], 'code').slice(0, 5);
  await storage.set({ [KEYS.recent]: newEmojis });
};

const subscribeToRecent = callback => {
  const handleChange = changes => {
    if (KEYS.recent in changes) {
      const { newValue, oldValue } = changes[KEYS.recent];
      callback(newValue, oldValue);
    }
  };

  const unsubscribe = storage.subscribe(handleChange);
  return unsubscribe;
};

const copyText = async str => {
  await navigator.clipboard.writeText(str);
};

const onEmojiClick = async emoji => {
  await copyText(emoji.code);
  await addToRecentEmojis(emoji);
};

export {
  fetchEmojis,
  getRecentEmojis,
  addToRecentEmojis,
  subscribeToRecent,
  copyText,
  onEmojiClick,
};
