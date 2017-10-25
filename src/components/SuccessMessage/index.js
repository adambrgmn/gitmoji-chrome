import React from 'react';
import PropTypes from 'prop-types';
import './successmessage.css';

export default function SuccessMessage({ emoji, show, hide }) {
  const emo = emoji == null ? {} : emoji;
  const classNames = [
    'message',
    'message-success',
    show && 'show',
    hide && 'hide',
  ];
  return (
    <div className={classNames.join(' ')}>
      <p className="message-message">
        {emo.emoji}&nbsp;&nbsp;Hey, I copied{' '}
        <code className="code">{emo.code}</code> for you!
      </p>
    </div>
  );
}

SuccessMessage.propTypes = {
  emoji: PropTypes.shape({
    emoji: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }),
  show: PropTypes.bool,
  hide: PropTypes.bool,
};

SuccessMessage.defaultProps = {
  emoji: {},
  show: false,
  hide: false,
};
