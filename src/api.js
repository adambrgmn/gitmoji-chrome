import uniqBy from 'lodash.uniqby';

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

const get = key =>
  new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(key, resolve);
    } catch (err) {
      reject(err);
    }
  });

const set = obj =>
  new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.set(obj, resolve);
    } catch (err) {
      reject(err);
    }
  });

const recentKey = `${process.env.STORAGE_KEY_PREFIX}-recent`;

const getRecentEmojis = async () => {
  const result = await get({ [recentKey]: [] });
  return result[recentKey];
};

const addToRecentEmojis = async emoji => {
  const oldEmojis = (await get({ [recentKey]: [] }))[recentKey];
  const newEmojis = uniqBy([emoji, ...oldEmojis], 'code').slice(0, 5);
  await set({ [recentKey]: newEmojis });
};

export { fetchEmojis, getRecentEmojis, addToRecentEmojis };
