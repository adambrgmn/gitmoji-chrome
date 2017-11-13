import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as types from '../../propTypes';
import { modularScale, opacify } from 'polished';
import { color } from '../../style/theme';
import { transition, boxShadow } from '../../style/utils';

const RecentPreviewBtn = styled.button`
  position: relative;
  width: 100%;
  height: 0;
  border: none;
  border-radius: 4px;
  padding: 0;
  padding-top: 100%;
  font-size: ${modularScale(1)};
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
  }

  &:focus {
    outline: none;
  }

  ${transition('box-shadow', 'transform')};
  ${boxShadow(true)};
`;

const RecentEmoji = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

class RecentPreview extends PureComponent {
  static propTypes = {
    emoji: types.emoji.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { emoji, onClick } = this.props;
    return (
      <RecentPreviewBtn
        style={{ backgroundColor: emoji.color }}
        onClick={() => onClick(emoji)}
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
    box-shadow: 0 1px 2px 0 ${opacify(0.6, color.shadow)};
    transform: translateY(0);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px dashed ${color.grey};
    border-radius: 4px;
  }
`;

export { RecentPreviewEmpty, RecentPreview };
