/**
 * @description All image elements must have finished loading before calling this function
 * @param cssSelector Selector that matches only all the images we want to find the average aspect ratio for
 * @returns The average percentage based ratio
 */
export function getAverageImageRatio(cssSelector = 'li img'): number {
  const images: HTMLImageElement[] = Array.from(document.querySelectorAll(cssSelector));
  const imageSizes = images.map((x) => {
    return {
      width: x.width,
      height: x.height,
      ratio: x.width / x.height,
    };
  });
  const averageImageRatio = imageSizes.reduce((acc, curr) => acc + curr.ratio, 0) / images.length;

  return averageImageRatio * 100;
}
