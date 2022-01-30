/**
 * Compares two semantic version.
 * @param  {string} ver1 New version
 * @param  {string} ver2 Old version
 * @return {boolean | undefined} returns true if ver1 is newer than ver2. Returns undefined if ver1 or ver2 are not provided
 * @see https://stackoverflow.com/a/47159772/1724106
 */
export const compareVersion = (ver1: string, ver2: string): boolean | undefined => {
  if (!ver1 || !ver2) return;

  const v1parts = ver1.split('.');
  const v2parts = ver2.split('.');

  const v1 = v1parts.map((s) => s.padStart(10)).join('.');
  const v2 = v2parts.map((s) => s.padStart(10)).join('.');

  return v1 > v2;
};
