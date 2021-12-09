export const isTouchOnlyDevice = (): boolean => {
  return window.matchMedia && !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
};
