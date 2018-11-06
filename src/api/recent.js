import uniqBy from 'lodash.uniqby';
import * as storage from '../chrome/storage';

const key = `${process.env.STORAGE_KEY_PREFIX}-recent`;

const getRecent = async () => {
  let { [key]: result } = await storage.get(key);
  if (!Array.isArray(result)) result = [];

  return result;
};

const updateRecent = async emoji => {
  const oldEmojis = await getRecent();
  const newEmojis = uniqBy([emoji, ...oldEmojis], 'code').slice(0, 5);
  await storage.set({ [key]: newEmojis });
};

const subscribeToRecent = callback => storage.subscribeTo(key, callback);

export { getRecent, updateRecent, subscribeToRecent };
