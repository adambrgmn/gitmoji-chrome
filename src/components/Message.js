import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { modularScale, hideVisually } from 'polished';
import posed from 'react-pose';

const transition = {
  translateY: { type: 'spring' },
};

const MessageContainer = styled(
  posed.div({
    enter: { opacity: 1, translateY: 0, transition },
    exit: { opacity: 0, translateY: -100, transition },
  }),
)`
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
  color: ${p => p.theme.color.white};
  box-shadow: 0 25px 10px -15px rgba(0, 0, 0, 0.05);
  background-color: ${p =>
    p.type === 'error' ? p.theme.color.orange : p.theme.color.pink};
  z-index: ${p => p.theme.zIndex.three};
`;

const MessageEmoji = styled.span`
  min-width: 20vw;
  font-size: ${modularScale(1)};
  text-align: center;
`;

const MessageText = styled.span`
  width: 100%;
  padding-right: ${modularScale(0)};
  text-align: center;
`;

const MessageDismiss = styled.button`
  position: absolute;
  display: block;
  top: ${modularScale(0)};
  right: ${modularScale(0)};
  width: ${modularScale(0)};
  height: ${modularScale(0)};
  border: none;
  background-color: transparent;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3px;
    height: 100%;
    background-color: ${p => p.theme.color.white};
    transform-origin: 50% 50%;
    transform: translate(-50%, -50%);
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  & > span {
    ${hideVisually()};
  }
`;

const Message = memo(
  ({ notification, type, dismissable, onDismiss, ...props }) => (
    <MessageContainer type={type} {...props}>
      {dismissable && (
        <MessageDismiss onClick={() => onDismiss(notification.id)}>
          <span>Dismiss</span>
        </MessageDismiss>
      )}

      <MessageEmoji>
        <span role="img" aria-label="emoji">
          {notification.emoji}
        </span>
      </MessageEmoji>

      <MessageText>{notification.message}</MessageText>
    </MessageContainer>
  ),
);

Message.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  onDismiss: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['error', 'standard']),
  dismissable: PropTypes.bool,
};

Message.defaultProps = {
  type: 'standard',
  dismissable: true,
};

export { Message as default };
