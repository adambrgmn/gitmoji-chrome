import { updateRecent } from './api/recent';
import { updateStatistics } from './api/statistics';
import { emitter, events } from './api/events';

const handleEmojiClick = async emoji => {
  try {
    await navigator.clipboard.writeText(emoji.code);

    await updateRecent(emoji);
    await updateStatistics(emoji);

    emitter.emit(events.copy, emoji);
  } catch (err) {
    const error = new Error(
      `An error occured while trying to copy ${emoji.emoji} (${
        emoji.code
      }) to the clipboard`,
    );

    emitter.emit(events.error, error);
    throw error;
  }
};

export { handleEmojiClick };
