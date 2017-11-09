import React from 'react';
import PropTypes from 'prop-types';
import * as types from '../../propTypes';

function RecentPreview({ emoji, onClick }) {
  return (
    <button
      className="recent-button"
      style={{ backgroundColor: emoji.color }}
      onClick={onClick}
    >
      <span className="recent-emoji">{emoji.emoji}</span>
    </button>
  );
}

RecentPreview.propTypes = {
  emoji: types.emoji,
  onClick: PropTypes.func.isRequired,
};

export { RecentPreview as default };
