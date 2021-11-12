import { breakpoints } from '@/constants/breakpoints';
import { AppLayoutSizeWidth } from '@/store/app/types';

export const determineAppLayoutSizeWidth = (): AppLayoutSizeWidth => {
  const w = window.innerWidth;
  if (w < breakpoints.xs) {
    return 'mobile';
  }
  if (w < breakpoints.sm) {
    return 'tablet';
  }
  return 'desktop';
};
