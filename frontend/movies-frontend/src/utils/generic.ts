/**
 * returns a number between the two provided numbers. This includes the lower bound, but excludes the upper bound. This is intentional, to match the behaviour of e.g. Math.random and Array.slice
 * @summary returns a number between the two provided numbers
 * @function
 * @param {number} min - minimum number
 * @param {number} max - maximum number
 * @returns {number}
 */
export const random = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

/**
 * Takes an array, and returns a random item from that array
 * @function
 * @param {Array} arr - array of items to sample from
 * @returns {any} - item at a random index in the array
 */
export const sampleOne = (arr: unknown[]): unknown => {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * returns a defined amount of random samples from an array
 * @function
 * @param {Array} arr - array of items to sample from
 * @param {number} len - amount of samples to take from the array
 * @returns {Array} - array of random items from the array. NB. these are not guaranteed to be unique
 */
export const sample = (arr: unknown[], len = 1): unknown[] => {
  const output = [];

  for (let i = 0; i < len; i++) {
    output.push(sampleOne(arr));
  }

  return output;
};

/**
 * clamps a value between an upper and lower bound
 * @function
 * @param {number} number - preferred return value
 * @param {number} lower - smallest (most negative) allowed return value
 * @param {number} upper - largest (most positive) allowed return value
 * @returns {number} - the preferred value, unless it exceeds the lower or upper bound
 */
export const clamp = (number: number, lower: number, upper: number): number => {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
};

/**
 * https://stackoverflow.com/a/12646864
 *
 * Durstenfeld shuffle. Shuffles an array in-place
 * @function
 * @param {Array} array - Array to shuffle
 * @return {Array} - The original array, with it's items shuffled
 */
export const shuffleArray = (array: unknown[]): void => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

//reference: https://jsdoc.app/index.html#block-tags
