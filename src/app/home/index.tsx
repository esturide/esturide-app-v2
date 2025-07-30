import { useCounterManager } from '@/context/CounterContext.tsx';

function UserMenu() {
  const { counter } = useCounterManager();

  return (
    <>
      <h1>Hello world</h1>

      <div>
        <p>Current count: {counter}</p>
      </div>
    </>
  );
}

export default UserMenu;
