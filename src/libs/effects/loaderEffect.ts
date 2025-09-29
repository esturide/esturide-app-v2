export default async function loaderEffect(
  effect: () => Promise<void>,
  setLoading: (status: boolean) => void,
) {
  setLoading(true);

  await effect();

  setLoading(false);
}
