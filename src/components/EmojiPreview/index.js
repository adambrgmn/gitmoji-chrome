import React from 'react';
import PropTypes from 'prop-types';
import './emojipreview.css';

export function EmojiPreviewContainer({ children }) {
  return <ul className="emoji-card-container">{children}</ul>;
}

EmojiPreviewContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function EmojiPreview({ emoji, color, onClick }) {
  return (
    <li className={`emoji-card emoji-${emoji.name}`} onClick={onClick}>
      <header className="emoji-card-header" style={{ backgroundColor: color }}>
        <h3 className="emoji-card-emoji">{emoji.emoji}</h3>
      </header>
      <div className="emoji-card-info">
        <code className="code">{emoji.code}</code>
        <p className="emoji-card-desc">{emoji.description}</p>
      </div>
    </li>
  );
}

EmojiPreview.propTypes = {
  emoji: PropTypes.shape({
    emoji: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
