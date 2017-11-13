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
  padding: ${modularScale(0)};
`;

const Title = styled.h2`
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
`;

const Bar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  font-size: ${modularScale(-1)};
  background-color: ${color.yellow};
  transform-origin: 100% 100%;
  ${transition('transform')};
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
  return (
    <Container>
      <Title>Most used emojis:</Title>
      {stats.length > 0 && (
        <BarsContainer>
          {stats.map(stat => (
            <BarContainer key={stat.code}>
              <Bar
                style={{
                  transform: `scaleY(${stat.total / highest})`,
                  backgroundColor: stat.color,
                }}
              />
              <BarText>
                {stat.emoji} {stat.total}
              </BarText>
            </BarContainer>
          ))}
        </BarsContainer>
      )}
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
