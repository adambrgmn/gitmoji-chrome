import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { modularScale } from 'polished';
import { mostUsedSelector } from '../../store/recent/selectors';
import { transition } from '../../style/utils';
import { color } from '../../style/theme';

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: ${modularScale(0)};
  font-size: ${modularScale(0)};
  font-weight: 400;
`;

const BarsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: ${modularScale(-1)};
  align-items: end;
  height: ${modularScale(5)};
  margin: 0;
  padding: 0;
  list-style: none;
`;

const BarContainer = styled.li`
  position: relative;
  width: 100%;
  height: 100%;
  font-size: ${modularScale(-1)};

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

const Bar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  font-size: ${modularScale(-1)};
  background-color: ${color.yellow};
  transform-origin: 100% 100%;
  ${transition('height')};

  &::after {
    content: ${props => `"${props.emoji}"` || '""'};
    position: absolute;
    bottom: 0;
    left: 50%;
    font-size: 2em;
    transform: translateX(-50%);
  }
`;

const BarText = styled.p`
  position: absolute;
  bottom: -${modularScale(2)};
  left: 50%;
  width: 100%;
  text-align: center;
  margin: 0;
  transform: translateX(-50%);
`;

const Stats = ({ stats }) => {
  const highest = stats.length > 0 ? stats[0].total : 1;
  const arr = [...stats, ...Array.from({ length: 5 - stats.length })];

  return (
    <Container>
      <Title>Most used emojis:</Title>
      <BarsContainer>
        {arr.map((stat, i) => (
          <BarContainer key={stat ? stat.code : i}>
            {stat != null && (
              <Bar
                emoji={stat.emoji}
                style={{
                  height: `calc(100% * ${stat.total / highest})`,
                  backgroundColor: stat.color,
                }}
              />
            )}
            {stat != null && <BarText>{stat.total}</BarText>}
          </BarContainer>
        ))}
      </BarsContainer>
    </Container>
  );
};

Stats.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      emoji: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      color: PropTypes.string,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  stats: mostUsedSelector(state),
});

export default connect(mapStateToProps)(Stats);
