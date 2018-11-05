import { unstable_createResource as createResource } from 'react-cache';
import { fetchEmojis, getRecentEmojis } from './api';

const EmojiResource = createResource(() => fetchEmojis());
const RecentResource = createResource(() => getRecentEmojis());

export { EmojiResource, RecentResource };
