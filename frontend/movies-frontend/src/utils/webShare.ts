// https://web.dev/web-share/
// https://web.dev/learn/pwa/os-integration/#web-share
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API

export const getShareUrl = (): string => {
  let url = document.location.href;
  const canonicalElement = document.querySelector('link[rel=canonical]');
  if (canonicalElement !== null) {
    // use canoncialUrl as the shared url if it exists.
    url = (canonicalElement as HTMLLinkElement).href;
  }

  return url;
};

export const sharingSupported = (): boolean => {
  return !!('share' in navigator); // The Web Share API is not compatible with your browser and device
};

export type shareResult = 'success' | 'aborted' | 'error';

export const share = async (toShare: ShareData): Promise<shareResult> => {
  // TODO: update typescript
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (navigator.canShare(toShare)) {
    try {
      await navigator.share(toShare);
      return 'success'; // content shared
    } catch (e) {
      return 'aborted'; // content was not shared by the user
    }
  } else {
    return 'error'; // content is not compatible with this browser and device
  }
};
