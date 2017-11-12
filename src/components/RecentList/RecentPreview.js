import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as types from '../../propTypes';

const RecentPreviewBtn = styled.button`
  position: relative;
  width: 100%;
  height: 0;
  border: none;
  border-radius: 4px;
  padding: 0;
  padding-top: 100%;
  font-size: var(--scale-0);
  box-shadow: 0 1px 2px 0 rgba(168, 182, 191, 0.6);
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(168, 182, 191, 0.6);
    transform: translateY(-3px);
  }

  &:focus {
    outline: none;
  }
`;

const RecentEmoji = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

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
      <RecentPreviewBtn
        style={{ backgroundColor: emoji.color }}
        onClick={onClick}
      >
        <RecentEmoji>{emoji.emoji}</RecentEmoji>
      </RecentPreviewBtn>
    );
  }
}

const RecentPreviewEmpty = RecentPreviewBtn.extend`
  background-color: transparent;
  cursor: initial;

  &:hover {
    box-shadow: 0 1px 2px 0 rgba(168, 182, 191, 0.6);
    transform: translateY(0);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px dashed var(--color-grey);
    border-radius: 4px;
  }
`;

export { RecentPreviewEmpty, RecentPreview };
