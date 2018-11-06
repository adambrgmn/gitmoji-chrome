import emojis from '../../../test/data/emojis.json';

const random = () => Math.floor(Math.random * 10);

const getStatistics = jest.fn(() =>
  Promise.resolve(
    emojis.map(({ code, emoji, color }) => ({
      code,
      emoji,
      color,
      count: random(),
    })),
  ),
);

const addToStatisticsgetStatistics = jest.fn(() => Promise.resolve());

const subscribeToStatisticsgetStatistics = jest.fn();

export {
  getStatistics,
  addToStatisticsgetStatistics,
  subscribeToStatisticsgetStatistics,
};
