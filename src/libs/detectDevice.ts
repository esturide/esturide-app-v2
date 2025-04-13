export const isInstancePWA = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches;
};

export const isMobileDevice = (): boolean => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export const isInstanceMobilePWA = (): boolean => {
  return isMobileDevice() && isInstancePWA();
};
