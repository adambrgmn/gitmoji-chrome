import { unstable_createResource as createResource } from 'react-cache';
import { fetchEmojis, getRecentEmojis, getStatistics } from './api';

const EmojiResource = createResource(() => fetchEmojis());
const RecentResource = createResource(() => getRecentEmojis());
const StatisticsResource = createResource(() => getStatistics());

export { EmojiResource, RecentResource, StatisticsResource };
