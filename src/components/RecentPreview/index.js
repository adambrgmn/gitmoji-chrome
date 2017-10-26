import React from 'react';
import PropTypes from 'prop-types';
import './recentpreview.css';

export default function RecentPreview({ emoji, color, onClick }) {
  return (
    <button
      className="recent-button"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      <span className="recent-emoji">{emoji.emoji}</span>
    </button>
  );
}

RecentPreview.propTypes = {
  emoji: PropTypes.shape({
    emoji: PropTypes.string.isRequired,
  }).isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export function RecentPreviewContainer({ children }) {
  return <div className="recent-container">{children}</div>;
}

RecentPreviewContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
