import uniqBy from 'lodash.uniqby';
import * as storage from '../chrome/storage';

const key = `${process.env.STORAGE_KEY_PREFIX}-stats`;

const getStatistics = async () => {
  try {
    let { [key]: stats } = await storage.get(key);
    if (!Array.isArray(stats)) stats = [];
    return stats;
  } catch (err) {
    throw new Error(
      'An error occured while trying to get statistics from storage',
    );
  }
};

const updateStatistics = async ({ code, emoji, color }) => {
  const stats = await getStatistics();

  try {
    const stat = stats.find(e => e.code === code) || { code, emoji, color };
    stat.count = (stat.count || 0) + 1;

    const newStats = uniqBy([stat, ...stats], 'code');
    await storage.set({ [key]: newStats });
  } catch (err) {
    throw new Error('An error occured while trying to update statistics');
  }
};

const subscribeToStatistics = callback => storage.subscribeTo(key, callback);

export { getStatistics, updateStatistics, subscribeToStatistics };
