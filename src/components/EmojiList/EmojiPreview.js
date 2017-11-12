import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as types from '../../propTypes';

class EmojiPreview extends Component {
  static propTypes = {
    emoji: types.emoji.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.emoji.code !== nextProps.emoji.code;
  }

  render() {
    const { emoji, onClick } = this.props;

    return (
      <li className={`emoji-card emoji-${emoji.name}`} onClick={onClick}>
        <header
          className="emoji-card-header"
          style={{ backgroundColor: emoji.color }}
        >
          <h3 className="emoji-card-emoji">{emoji.emoji}</h3>
        </header>
        <div className="emoji-card-info">
          <code className="code">{emoji.code}</code>
          <p className="emoji-card-desc">{emoji.description}</p>
        </div>
      </li>
    );
  }
}

export { EmojiPreview as default };
