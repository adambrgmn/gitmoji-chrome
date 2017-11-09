import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled, { keyframes } from 'styled-components';
import { modularScale } from 'polished';
import * as constants from '../../store/messages/constants';
import { removeMessage } from '../../store/messages/actions';
import { messagesSelector } from '../../store/messages/selectors';
import { color, zIndex } from '../../style/theme';

const animationBounceInOut = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
  }

  10% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
  }

  15% {
    transform: translate3d(0, -10px, 0);
  }

  17% {
    transform: translate3d(0, 5px, 0);
  }

  20%,
  79% {
    transform: none;
  }

  80% {
    transform: translate3d(0, -10px, 0);
  }

  90%,
  95% {
    opacity: 1;
    transform: translate3d(0, 20px, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(0, -300px, 0);
  }
`;

const NotifyContainer = styled.div`
  width: 100%;
`;

const NotifyMessage = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  top: ${modularScale(0)};
  left: ${modularScale(0)};
  width: calc(100vw - (2 * ${modularScale(0)}));
  height: 20vw;
  border-radius: 4px;
  font-weight: 500;
  color: ${color.white};
  box-shadow: 0 25px 10px -15px rgba(0, 0, 0, 0.05);
  z-index: ${zIndex.three};
  animation-duration: 5s;
  animation-fill-mode: both;
  animation-name: ${animationBounceInOut};

  background-color: ${props =>
    props.type === constants.MESSAGE_SUCCESS ? color.pink : color.orange};
`;

const NotifyMessageEmoji = styled.span`
  min-width: 20vw;
  font-size: ${modularScale(1)};
  text-align: center;
`;

const NotifyMessageText = styled.span`
  width: 100%;
  padding-right: ${modularScale(0)};
  text-align: center;
`;

class Notify extends PureComponent {
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
      <NotifyContainer>
        {messages.map((msg, i) => (
          <NotifyMessage
            key={msg.message}
            type={msg.type}
            style={{
              top: `calc((20vw + ${modularScale(0)}) * ${i} + ${modularScale(
                0,
              )})`,
            }}
            onAnimationEnd={this.handleAnimationEnd(msg)}
          >
            <NotifyMessageEmoji>{msg.icon || '🐛'}</NotifyMessageEmoji>
            <NotifyMessageText>{msg.message}</NotifyMessageText>
          </NotifyMessage>
        ))}
      </NotifyContainer>
    );
  }
}

const mapStateToProps = state => ({
  messages: messagesSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeMessage }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notify);
