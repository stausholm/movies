type OS = 'os' | 'windows' | 'macos' | 'linux' | 'unix';

/**
 *
 * @returns browsername based on userAgent string or undefined if no match
 */
export const getBrowserName = (): string | undefined => {
  const ua = navigator.userAgent;
  let tem;
  const M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

  if (/trident/i.test(M[1])) return 'IE';

  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edg)\/(\d+)/);
    if (tem != null) return tem[1].replace('OPR', 'Opera').replace('Edg', 'Edge');
  }

  if (M[2]) return M[1];
  return M[0];
};

/**
 *
 * @returns name of user's operating system or 'os' if no match
 */
export const getOSName = (): OS => {
  let OSName = 'os' as OS;
  if (navigator.userAgent.indexOf('Win') != -1) OSName = 'windows';
  else if (navigator.userAgent.indexOf('Mac') != -1) OSName = 'macos';
  else if (navigator.userAgent.indexOf('X11') != -1) OSName = 'unix';
  else if (navigator.userAgent.indexOf('Linux') != -1) OSName = 'linux';
  return OSName;
};
