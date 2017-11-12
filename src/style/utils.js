import { css } from 'styled-components';
import { transitions, timingFunctions } from 'polished';

const transition = (...props: TransitionProps[]) => css`
  ${transitions(
    ...props.map(p => {
      if (typeof p === 'string') {
        return `${p} 0.3s ${timingFunctions('easeInOutSine')}`;
      }

      return `${
        p.prop
      } ${p.duration || '0.3s'} ${p.timing || timingFunctions('easeInOutSine')}`;
    }),
  )};
  will-change: ${props
    .map(p => {
      if (typeof p === 'string') return p;
      return p.prop;
    })
    .join(', ')};
`;

export { transition };
