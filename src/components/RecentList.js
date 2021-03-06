/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import posed, { PoseGroup } from 'react-pose';
import { RecentPreview, RecentPreviewEmpty } from './RecentPreview';
import { handleEmojiClick } from '../utils';
import { RecentResource } from '../resources';
import { subscribeToRecent } from '../api/recent';

const RecentPreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: ${modularScale(-1)};
  width: 100%;
  margin-top: ${modularScale(1)};
  padding: 0 ${modularScale(0)};
`;

const Child = posed.div();

function RecentList() {
  const initialEmojis = RecentResource.read();
  const [emojis, setEmojis] = useState(initialEmojis);

  useEffect(
    () => subscribeToRecent((newValue = []) => setEmojis(newValue)),
    [],
  );

  const recents = [...emojis, ...Array.from({ length: 5 })].slice(0, 5);

  return (
    <RecentPreviewContainer>
      <PoseGroup>
        {recents.map((emoji, i) => (
          <Child key={emoji ? emoji.code : i}>
            {emoji != null ? (
              <RecentPreview
                key={emoji.code}
                emoji={emoji}
                onClick={handleEmojiClick}
              />
            ) : (
              <RecentPreviewEmpty disable key={i} />
            )}
          </Child>
        ))}
      </PoseGroup>
    </RecentPreviewContainer>
  );
}

export { RecentList as default };
