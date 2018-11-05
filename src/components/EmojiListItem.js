import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { modularScale } from 'polished';
import { transition, boxShadow } from '../style/utils';
import * as types from '../prop-types';

const EmojiCard = styled.li`
  display: grid;
  grid-template-columns: ${modularScale(5)} auto;
  grid-template-rows: ${modularScale(5)};
  align-items: center;
  width: 100%;
  margin-bottom: ${modularScale(0)};
  border-radius: 4px;
  background-color: ${p => p.theme.color.white};
  list-style: none;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
  }

  ${boxShadow(true)};

  ${transition('box-shadow', 'transform')};
`;

const EmojiCardHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${p => p.theme.color.yellow};
`;

const EmojiCardEmoji = styled.h3`
  margin: 0;
  font-size: ${modularScale(2)};
  transform: translateY(10%);
`;

const EmojiCardInfo = styled.div`
  padding-left: ${modularScale(0)};
`;

const EmojiCardCode = styled.code`
  font-family: ${p => p.theme.font.body};
  font-size: ${modularScale(1)};
  font-weight: 700;
`;

const EmojiCardDesc = styled.p`
  margin: 0;
  font-size: ${modularScale(-1)};
`;

const EmojiPreview = memo(({ emoji, onClick }) => (
  <EmojiCard role="button" onClick={() => onClick(emoji)}>
    <EmojiCardHeader style={{ backgroundColor: emoji.color }}>
      <EmojiCardEmoji>{emoji.emoji}</EmojiCardEmoji>
    </EmojiCardHeader>
    <EmojiCardInfo>
      <EmojiCardCode>{emoji.code}</EmojiCardCode>
      <EmojiCardDesc>{emoji.description}</EmojiCardDesc>
    </EmojiCardInfo>
  </EmojiCard>
));

EmojiPreview.propTypes = {
  emoji: types.emoji.isRequired,
  onClick: PropTypes.func.isRequired,
};

export { EmojiPreview as default };
