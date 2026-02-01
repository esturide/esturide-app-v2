import { useEffect, useCallback } from 'react';

/**
 * Hook to make a periodic request.
 * @param {Function} callback - Target function.
 * @param {number | null} delay - The time in milliseconds between executions.
 */
const useIntervalEffect = (
  callback: () => Promise<void>,
  delay: number | null,
) => {
  const memoizedCallback = useCallback(callback, []);

  useEffect(() => {
    if (delay !== null) {
      const intervalId = setInterval(memoizedCallback, delay);

      return () => clearInterval(intervalId);
    }
  }, [delay, memoizedCallback]);
};

export default useIntervalEffect;
