import React, { Children } from 'react';
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

export function EmptyPreview() {
  return (
    <button className="recent-button recent-button-empty" disabled>
      {' '}
    </button>
  );
}

export function RecentPreviewContainer({ children }) {
  const childrenLength = Children.toArray(children).length;
  const emptySpots = [...Array.from({ length: 5 - childrenLength })];

  return (
    <div className="recent-container">
      {children}
      {emptySpots.map((_, i) => <EmptyPreview key={i} />)}
    </div>
  );
}

RecentPreviewContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
