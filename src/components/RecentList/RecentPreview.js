import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as types from '../../propTypes';

class RecentPreview extends Component {
  static propTypes = {
    emoji: types.emoji.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.emoji.code !== nextProps.emoji.code;
  }

  render() {
    const { emoji, onClick } = this.props;
    console.log('rerender', emoji.emoji);
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
}

export { RecentPreview as default };
