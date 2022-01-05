export type clickRegionType = 'topright' | 'topleft' | 'bottomright' | 'bottomleft';

/**
 *
 * @param ev Mouse click event
 * @returns which quarter of the viewport was clicked
 */
export const clickRegion = (ev: MouseEvent): clickRegionType => {
  const X = ev.clientX;
  const Y = ev.clientY;
  const topHalf = window.innerHeight / 2 > Y;
  const leftSide = window.innerWidth / 2 > X;

  if (topHalf && !leftSide) {
    //clicked topright
    return 'topright';
  }
  if (topHalf && leftSide) {
    //clicked topleft
    return 'topleft';
  }
  if (!topHalf && !leftSide) {
    //clicked bottomright
    return 'bottomright';
  }
  if (!topHalf && leftSide) {
    //clicked bottomleft
    return 'bottomleft';
  }

  // fallback to topright
  return 'topright';
};
