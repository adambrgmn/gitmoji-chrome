import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as types from '../../propTypes';

const EmojiCard = styled.li`
  display: grid;
  grid-template-columns: var(--scale-3) auto;
  grid-template-rows: var(--scale-3);
  align-items: center;
  width: 100%;
  margin-bottom: var(--scale-0);
  border-radius: 4px;
  background-color: var(--color-white);
  box-shadow: 0 1px 2px 0 rgba(168, 182, 191, 0.6);
  list-style: none;
  overflow: hidden;
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(168, 182, 191, 0.6);
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
  background-color: var(--color-yellow);
`;

const EmojiCardEmoji = styled.h3`
  margin: 0;
  font-size: var(--scale-1);
  transform: translateY(12.5%);
`;

const EmojiCardInfo = styled.div`
  padding-left: var(--scale-0);
`;

const EmojiCardCode = styled.code`
  font-family: var(--font-serif);
  font-size: var(--scale-0);
  font-weight: 700;
`;

const EmojiCardDesc = styled.p`
  margin: 0;
  font-size: var(--scale--1);
`;

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
      <EmojiCard onClick={onClick}>
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
