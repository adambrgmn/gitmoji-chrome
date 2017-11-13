import { createSelector } from 'reselect';

const recentSelector = state => state.recent;

const uniqRecentSelector = createSelector(recentSelector, recent => {
  const uniq = [];
  let i = 0;

  while (uniq.length < 5) {
    const nextItem = recent[i];
    if (nextItem == null) break;

    const equal = uniq.find(i => i.name === nextItem.name);
    if (equal == null) uniq.push(nextItem);
    i++;
  }

  return uniq;
});

const mostUsedSelector = createSelector(recentSelector, recent => {
  return recent
    .reduce((acc, curr) => {
      const { code, emoji, color } = curr;

      const hasCounted = acc.find(obj => obj.code === code);
      if (hasCounted != null) return acc;

      const total = recent.filter(r => r.code === code).length;
      return [...acc, { code, emoji, color, total }];
    }, [])
    .sort((a, b) => {
      if (a.total > b.total) return -1;
      if (a.total < b.total) return 1;
      return 0;
    })
    .slice(0, 5);
});

export { recentSelector, uniqRecentSelector, mostUsedSelector };
