export const isLaunchedInBrowser = (): boolean => {
  // @ts-expect-error non-standard IOS property
  if (navigator.standalone) {
    return false; // iOS
  }
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return false; // Android with "display": "standalone" in Manifest
  }
  // if (new URL(window.location).searchParams.has('homescreen')) {
  //   return true;  // fallback to check for "?homescreen=1"
  // }
  if (window.location.search.includes('source=pwa')) {
    return false;
  }
  return true;
};

export const disableBrowserFeatures = (): void => {
  // prevent long press on mobile links, and right click on desktop
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // not touch device so assume desktop
  if ('ontouchstart' in window === false) {
    // prevent middlemouseclick on desktop
    window.addEventListener('auxclick', (e) => {
      e.preventDefault();
    });

    // prevent view source and browser devtools
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey && e.key.toLowerCase() === 'u') || e.key === 'F12') {
        e.preventDefault();
      }
    });
  }
};
