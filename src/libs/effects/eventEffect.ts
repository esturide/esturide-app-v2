export default function eventEffect(effect: () => Promise<void>, type: string) {
  const handleScreenChange = async () => {
    await effect();
  };

  window.addEventListener(type, handleScreenChange);

  return () => {
    window.removeEventListener(type, handleScreenChange);
  };
}
