import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './notify.css';

export default class Notify extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf(['error', 'standard']).isRequired,
        message: PropTypes.string.isRequired,
        emoji: PropTypes.string,
      }),
    ).isRequired,
  };

  handleAnimationEnd = msg => e => {
    console.log(msg);
  };

  getMessages = () => {
    const { messages } = this.props;
    return messages.filter((m, i) => {
      const slice = messages.slice(i + 1);
      const duplicate = slice.findIndex(s => s.message === m.message) > -1;

      return !duplicate;
    });
  };

  render() {
    return (
      <div className="notify-container">
        {this.getMessages().map(msg => (
          <div
            key={msg.message}
            className={`notify-message notify-${msg.type || 'standard'}`}
            onAnimationEnd={this.handleAnimationEnd(msg)}
          >
            <span className="notify-message-emoji">{msg.emoji || '🐛'}</span>
            {msg.message}
          </div>
        ))}
      </div>
    );
  }
}
