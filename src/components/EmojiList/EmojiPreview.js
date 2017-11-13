import React, { PureComponent } from 'react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { modularScale, opacify } from 'polished';
import { color, font } from '../../style/theme';
import { transition } from '../../style/utils';
import * as types from '../../propTypes';

const EmojiCard = styled.li`
  display: grid;
  grid-template-columns: ${modularScale(4)} auto;
  grid-template-rows: ${modularScale(4)};
  align-items: center;
  width: 100%;
  margin-bottom: ${modularScale(0)};
  border-radius: 4px;
  background-color: ${color.white};
  box-shadow: 0 1px 2px 0 ${opacify(0.6, color.shadow)};
  list-style: none;
  overflow: hidden;
  ${transition('box-shadow', 'transform')} &:hover {
    box-shadow: 0 4px 8px 0 ${opacify(0.6, color.shadow)};
    transform: translateY(-3px);
    cursor: pointer;
  }
`;

const EmojiCardHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${color.yellow};
`;

const EmojiCardEmoji = styled.h3`
  margin: 0;
  font-size: ${modularScale(1)};
  transform: translateY(10%);
`;

const EmojiCardInfo = styled.div`
  padding-left: ${modularScale(0)};
`;

const EmojiCardCode = styled.code`
  font-family: ${font.body};
  font-size: ${modularScale(0)};
  font-weight: 700;
`;

const EmojiCardDesc = styled.p`
  margin: 0;
  font-size: ${modularScale(-2)};
`;

class EmojiPreview extends PureComponent {
  static propTypes = {
    emoji: types.emoji.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { emoji, onClick } = this.props;

    return (
      <EmojiCard onClick={() => onClick(emoji)}>
        <EmojiCardHeader style={{ backgroundColor: emoji.color }}>
          <EmojiCardEmoji>{emoji.emoji}</EmojiCardEmoji>
        </EmojiCardHeader>
        <EmojiCardInfo>
          <EmojiCardCode>{emoji.code}</EmojiCardCode>
          <EmojiCardDesc>{emoji.description}</EmojiCardDesc>
        </EmojiCardInfo>
      </EmojiCard>
    );
  }
}

export { EmojiPreview as default };
