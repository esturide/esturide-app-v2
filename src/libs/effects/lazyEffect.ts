import { useEffect, useState } from 'react';
import lazyLoaderEffect from '$libs/effects/lazyLoaderEffect.ts';

type LazyResult<T> = {
  readonly loading: boolean;
  readonly error: boolean;
  readonly result: null | T;
};

/**
 * Hook to make a lazy request.
 */
export default function useLazyEffect<T>(
  effectCallback: () => Promise<T>,
  callbackException?: (e: Error | unknown) => void,
): LazyResult<T> {
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const request = async () => {
      try {
        const statusResult = await lazyLoaderEffect(effectCallback, setLoading);

        setResult(statusResult);
      } catch (error) {
        setLoading(false);
        setError(true);

        if (callbackException) {
          callbackException(error);
        }
      }
    };

    request();
  }, []);

  return { loading: loading, error: error, result: result };
}
