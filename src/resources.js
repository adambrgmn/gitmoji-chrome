import { unstable_createResource as createResource } from 'react-cache';
import { getEmojis } from './api/emojis';
import { getRecent } from './api/recent';
import { getStatistics } from './api/statistics';

const EmojiResource = createResource(() => getEmojis());
const RecentResource = createResource(() => getRecent());
const StatisticsResource = createResource(() => getStatistics());

export { EmojiResource, RecentResource, StatisticsResource };
