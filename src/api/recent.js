import uniqBy from 'lodash.uniqby';
import * as storage from '../chrome/storage';

const key = `${process.env.STORAGE_KEY_PREFIX}-recent`;

const getRecent = async () => {
  try {
    let { [key]: result } = await storage.get(key);
    if (!Array.isArray(result)) result = [];

    return result;
  } catch (err) {
    throw new Error('An error occured while trying to get emojis from storage');
  }
};

const updateRecent = async emoji => {
  const oldEmojis = await getRecent();

  try {
    const newEmojis = uniqBy([emoji, ...oldEmojis], 'code').slice(0, 5);
    await storage.set({ [key]: newEmojis });
  } catch (err) {
    throw new Error(
      'An error occured while trying to update recently use emojis',
    );
  }
};

const subscribeToRecent = callback => storage.subscribeTo(key, callback);

export { getRecent, updateRecent, subscribeToRecent };
