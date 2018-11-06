import { updateRecent } from './api/recent';
import { updateStatistics } from './api/statistics';

const handleEmojiClick = async emoji => {
  await navigator.clipboard.writeText(emoji.code);
  await updateRecent(emoji);
  await updateStatistics(emoji);
};

export { handleEmojiClick };
