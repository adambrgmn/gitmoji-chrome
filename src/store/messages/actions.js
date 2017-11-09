import { MESSAGE_SUCCESS, MESSAGE_ERROR } from './constants';
import * as clipboard from '../../utils/clipboard';

const messageSuccess = ({ message, icon }) => ({
  type: MESSAGE_SUCCESS,
  payload: { message, icon },
});

const messageError = ({ message, icon }) => ({
  type: MESSAGE_ERROR,
  payload: { message, icon },
});

const copy = emoji => dispatch => {
  try {
    const success = clipboard.copy(emoji.code);

    if (!success) {
      const err = new Error(`Failed to copy ${emoji.code}! Sorry 🙄`);
      err.icon = emoji.emoji;
      throw err;
    }

    const message = `Eyy! ${emoji.code} is on your clipboard!`;
    const icon = emoji.emoji;
    dispatch(messageSuccess({ message, icon }));
  } catch (e) {
    const {message, icon} = e;
    dispatch(messageError({ message, icon }));
  }
};

export { messageError, messageSuccess, copy };
