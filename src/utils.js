import { updateRecent } from './api/recent';
import { updateStatistics } from './api/statistics';

const handleEmojiClick = async emoji => {
  try {
    await navigator.clipboard.writeText(emoji.code);
  } catch (err) {
    throw new Error(
      'An error occured while trying to copy emoji to the clipboard',
    );
  }

  await updateRecent(emoji);
  await updateStatistics(emoji);
};

export { handleEmojiClick };
