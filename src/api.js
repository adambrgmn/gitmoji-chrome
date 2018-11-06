import uniqBy from 'lodash.uniqby';
import * as storage from './chrome/storage';

const keys = {
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
  const { [keys.recent]: result } = await storage.get({
    [keys.recent]: [],
  });
  return result;
};

const addToRecentEmojis = async emoji => {
  const { [keys.recent]: oldEmojis } = await storage.get({
    [keys.recent]: [],
  });
  const newEmojis = uniqBy([emoji, ...oldEmojis], 'code').slice(0, 5);
  await storage.set({ [keys.recent]: newEmojis });
};

const subscribeToRecent = callback => {
  const handleChange = changes => {
    if (keys.recent in changes) {
      const { newValue, oldValue } = changes[keys.recent];
      callback(newValue, oldValue);
    }
  };

  const unsubscribe = storage.subscribe(handleChange);
  return unsubscribe;
};

const getStatistics = async () => {
  const { [keys.stats]: stats } = await storage.get({
    [keys.stats]: [],
  });

  return stats.sort((a, b) => b.count - a.count);
};

const updateStatistics = async emoji => {
  const { [keys.stats]: stats } = await storage.get({
    [keys.stats]: [],
  });

  const stat = stats.find(e => e.code === emoji.code) || {
    code: emoji.code,
    emoji: emoji.emoji,
    color: emoji.color,
  };

  stat.count = (stat.count || 0) + 1;

  const newStats = uniqBy([stat, ...stats], 'code');
  await storage.set({ [keys.stats]: newStats });
};

const subscribeToStatistics = callback => {
  const handleChange = changes => {
    if (keys.stats in changes) {
      const { newValue, oldValue } = changes[keys.stats];
      callback(newValue, oldValue);
    }
  };

  const unsubscribe = storage.subscribe(handleChange);
  return unsubscribe;
};

const resetData = async () => {
  await Promise.all(Object.values(keys).map(key => storage.set({ [key]: [] })));
};

const copyText = async str => {
  await navigator.clipboard.writeText(str);
};

const onEmojiClick = async emoji => {
  await copyText(emoji.code);
  await addToRecentEmojis(emoji);
  await updateStatistics(emoji);
};

export {
  fetchEmojis,
  getRecentEmojis,
  addToRecentEmojis,
  subscribeToRecent,
  getStatistics,
  updateStatistics,
  subscribeToStatistics,
  resetData,
  copyText,
  onEmojiClick,
};
