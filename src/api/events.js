import mitt from 'mitt';

const emitter = mitt();

const events = {
  copy: 'copy',
  error: 'error',
};

export { emitter, events };
