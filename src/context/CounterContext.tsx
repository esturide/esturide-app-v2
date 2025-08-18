import { atom, useAtom } from 'jotai';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from 'react';
import UserButton from '@components/buttons/UserButton.tsx';

interface CounterInterface {
  counter: number;
}

const countAtom = atom(0);

const ContextContext = createContext<CounterInterface>({ counter: 0 });

const Add = () => {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div>
      <UserButton
        label={'Increment'}
        onClick={async () => setCount(count + 1)}
      />
    </div>
  );
};

export const CounterProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [count, setCount] = useAtom(countAtom);

  useEffect(() => {
    console.log(`Counter: ${count}`);
  }, [count]);

  return (
    <ContextContext.Provider value={{ counter: count }}>
      <Add />
      {children}
    </ContextContext.Provider>
  );
};

export const useCounterManager = () => {
  return useContext(ContextContext);
};
