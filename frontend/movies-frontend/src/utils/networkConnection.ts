export const CHECK_OFFLINE_EVENT_KEY = 'checkoffline';
export const CHECK_OFFLINE_EVENT = new CustomEvent(CHECK_OFFLINE_EVENT_KEY);
export const checkOffline = (): void => {
  document.dispatchEvent(CHECK_OFFLINE_EVENT);
};

// chromium specific progressive enhancement
//https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation#browser_compatibility
export const warnAboutMeteredConnection = (): boolean => {
  interface experimentalConnectionApi {
    saveData?: boolean;
    type?: string;
    effectiveType?: string;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigator = window.navigator as any;
  const connection = navigator.connection as experimentalConnectionApi;

  if (!connection) return false;

  if (
    connection.saveData ||
    connection.type === 'cellular' ||
    (connection.effectiveType && connection.effectiveType !== '4g')
  ) {
    return true;
  } else {
    return false;
  }
};
