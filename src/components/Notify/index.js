import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';

import './notify.css';
import * as constants from '../../store/messages/constants';
import { removeMessage } from '../../store/messages/actions';

class Notify extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf(Object.keys(constants)).isRequired,
        message: PropTypes.string.isRequired,
        icon: PropTypes.string,
      }),
    ).isRequired,
    removeMessage: PropTypes.func.isRequired,
  };

  handleAnimationEnd = msg => () => {
    this.props.removeMessage(msg);
  };

  render() {
    const { messages } = this.props;
    return (
      <div className="notify-container">
        {messages.map((msg, i) => (
          <div
            key={msg.message}
            style={{
              top: `calc((20vw + var(--scale-0)) * ${i} + var(--scale-0))`,
            }}
            className={`notify-message notify-${msg.type}`}
            onAnimationEnd={this.handleAnimationEnd(msg)}
          >
            <span className="notify-message-emoji">{msg.icon || '🐛'}</span>
            <span className="notify-message-message">{msg.message}</span>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: uniqWith(state.messages, isEqual),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Notify);
