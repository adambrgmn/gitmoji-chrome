import React, { Suspense, lazy, useState } from 'react';

const Button = lazy(() => import('./Button'));

function App() {
  const [count, setCount] = useState(0);

  const change = val => async () => {
    await Promise.resolve();
    setCount(c => c + val);
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div>
        <Button onClick={change(-1)}>-</Button>
        <span>{count}</span>
        <Button onClick={change(+1)}>+</Button>
      </div>
    </Suspense>
  );
}

export default App;
