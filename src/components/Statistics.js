import React, { Fragment, memo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import SettingsSectionTitle from './SettingsSectionTitle';
import { StatisticsResource } from '../resources';
import { subscribeToStatistics } from '../api/statistics';

const ListContainer = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  display: flex;
  flex-flow: column nowrap;
  justify-content: top;
  align-items: center;
`;

const Bar = styled.div`
  position: relative;
  width: ${modularScale(2.5)};
  height: ${modularScale(5)};
  border: 1px dashed ${p => p.theme.color.grey};
  border-radius: 4px;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(100% * ${p => p.barHeight});
    background-color: ${p => p.barColor};
  }
`;

const EmptyBar = styled(Bar)`
  &::before {
    display: none;
  }
`;

const Emoji = styled.span`
  margin-top: -${modularScale(2)};
  z-index: 1;
`;

const Count = styled.span`
  margin-top: ${modularScale(-1)};
`;

const Statistics = memo(() => {
  const initialStats = StatisticsResource.read();
  const [stats, setStats] = useState(initialStats);

  useEffect(
    () => subscribeToStatistics((newValue = []) => setStats(newValue)),
    [],
  );

  const topStats = [
    ...stats.sort((a, b) => b.count - a.count),
    ...Array.from({ length: 5 }),
  ].slice(0, 5);

  const max = topStats.reduce((m, e) => (e && e.count > m ? e.count : m), 0);

  return (
    <Fragment>
      <SettingsSectionTitle>Most used emojis:</SettingsSectionTitle>
      <ListContainer>
        {topStats.map((emoji, i) => (
          <ListItem key={emoji ? emoji.code : i}>
            {emoji != null ? (
              <Fragment>
                <Bar barHeight={emoji.count / max} barColor={emoji.color} />
                <Emoji>{emoji.emoji}</Emoji>
                <Count>{emoji.count}</Count>
              </Fragment>
            ) : (
              <EmptyBar />
            )}
          </ListItem>
        ))}
      </ListContainer>
    </Fragment>
  );
});

export { Statistics as default };
