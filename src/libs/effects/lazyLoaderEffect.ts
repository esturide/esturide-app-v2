export default async function lazyLoaderEffect<T>(
  callback: () => Promise<T>,
  setLoading: (status: boolean) => void,
) {
  setLoading(true);

  const result = await callback();

  setLoading(false);

  return result;
}
