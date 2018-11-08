import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import nanoid from 'nanoid';
import { PoseGroup } from 'react-pose';
import { emitter, events } from '../api/events';
import Message from './Message';

const Container = styled.div`
  width: 100%;
`;

const useNotifications = () => {
  const [state, setState] = useState([]);

  const add = ({ emoji, message }) => {
    const id = nanoid();
    setState(s => [...s, { id, emoji, message }]);
    return id;
  };

  const remove = id => setState(s => s.filter(n => n.id !== id));

  return [state, add, remove];
};

function Notifications() {
  const [notifications, add, remove] = useNotifications();

  useEffect(() => {
    const timers = [];

    const handleCopied = emoji => {
      const message = `${emoji.code} written to clipboard!`;
      const id = add({ message, emoji: emoji.emoji, type: 'standard' });

      timers.push(setTimeout(() => remove(id), 3000));
    };

    const handleError = error => {
      const { message } = error;
      add({ message, emoji: '🐛', type: 'error' });
    };

    emitter.on(events.copy, handleCopied);
    emitter.on(events.error, handleError);

    return () => {
      emitter.off(events.copy, handleCopied);
      emitter.off(events.error, handleError);
      timers.forEach(t => clearTimeout(t));
    };
  }, []);

  return (
    <Container>
      <PoseGroup>
        {notifications.map(notification => (
          <Message
            key={notification.id}
            notification={notification}
            type={notification.type}
            onDismiss={remove}
          />
        ))}
      </PoseGroup>
    </Container>
  );
}

export { Notifications as default };
