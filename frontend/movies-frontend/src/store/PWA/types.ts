export interface PWAState {
  launchedAsPWA: boolean;
  showPWAOverlay: boolean;
  deferredPrompt?: null | (() => void);
}
