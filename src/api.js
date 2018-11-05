import uniqBy from 'lodash.uniqby';
import * as storage from './chrome/storage';

const CHROME_STORAGE_KEYS = {
  recent: `${process.env.STORAGE_KEY_PREFIX}-recent`,
  stats: `${process.env.STORAGE_KEY_PREFIX}-stats`,
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
  const { [CHROME_STORAGE_KEYS.recent]: result } = await storage.get({
    [CHROME_STORAGE_KEYS.recent]: [],
  });
  return result;
};

const addToRecentEmojis = async emoji => {
  const { [CHROME_STORAGE_KEYS.recent]: oldEmojis } = await storage.get({
    [CHROME_STORAGE_KEYS.recent]: [],
  });
  const newEmojis = uniqBy([emoji, ...oldEmojis], 'code').slice(0, 5);
  await storage.set({ [CHROME_STORAGE_KEYS.recent]: newEmojis });
};

const subscribeToRecent = callback => {
  const handleChange = changes => {
    if (CHROME_STORAGE_KEYS.recent in changes) {
      const { newValue, oldValue } = changes[CHROME_STORAGE_KEYS.recent];
      callback(newValue, oldValue);
    }
  };

  const unsubscribe = storage.subscribe(handleChange);
  return unsubscribe;
};

const updateStatistics = async emoji => {
  const { [CHROME_STORAGE_KEYS.stats]: stats } = await storage.get({
    [CHROME_STORAGE_KEYS.stats]: {},
  });

  const currentCount = stats[emoji.code].count || 0;
  stats[emoji.code] = { ...emoji, count: currentCount + 1 };
  await storage.set({ [CHROME_STORAGE_KEYS.stats]: stats });
};

const copyText = async str => {
  await navigator.clipboard.writeText(str);
};

const onEmojiClick = async emoji => {
  await copyText(emoji.code);
  await addToRecentEmojis(emoji);
  // await updateStatistics(emoji);
};

export {
  fetchEmojis,
  getRecentEmojis,
  addToRecentEmojis,
  subscribeToRecent,
  updateStatistics,
  copyText,
  onEmojiClick,
};
