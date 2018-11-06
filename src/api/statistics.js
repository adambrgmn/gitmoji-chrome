import uniqBy from 'lodash.uniqby';
import * as storage from '../chrome/storage';

const key = `${process.env.STORAGE_KEY_PREFIX}-stats`;

const getStatistics = async () => {
  let { [key]: stats } = await storage.get(key);
  if (!Array.isArray(stats)) stats = [];
  return stats;
};

const updateStatistics = async ({ code, emoji, color }) => {
  const stats = await getStatistics();

  const stat = stats.find(e => e.code === code) || { code, emoji, color };

  stat.count = (stat.count || 0) + 1;

  const newStats = uniqBy([stat, ...stats], 'code');
  await storage.set({ [key]: newStats });
};

const subscribeToStatistics = callback => storage.subscribeTo(key, callback);

export { getStatistics, updateStatistics, subscribeToStatistics };
