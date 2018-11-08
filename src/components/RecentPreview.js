import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { modularScale } from 'polished';
import { transition, boxShadow } from '../style/utils';
import * as types from '../prop-types';

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

const RecentPreviewEmpty = styled(RecentPreviewBtn).attrs({
  disabled: true,
})`
  background-color: transparent;
  cursor: initial;

  &:hover {
    box-shadow: 0 1px 2px 0 ${p => p.theme.color.shadow};
    transform: translateY(0);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px dashed ${p => p.theme.color.grey};
    border-radius: 4px;
  }
`;

const RecentPreview = memo(({ emoji, onClick }) => (
  <RecentPreviewBtn
    style={{ backgroundColor: emoji.color }}
    onClick={() => onClick(emoji)}
    data-testid="recent-emoji"
  >
    <RecentEmoji>{emoji.emoji}</RecentEmoji>
  </RecentPreviewBtn>
));

RecentPreview.propTypes = {
  emoji: types.emoji.isRequired,
  onClick: PropTypes.func.isRequired,
};

export { RecentPreviewEmpty, RecentPreview };
