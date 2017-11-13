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

export { recentSelector, uniqRecentSelector };
