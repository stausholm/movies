export type AppLayoutSizeWidth = 'mobile' | 'tablet' | 'desktop';

export interface AppState {
  layoutSizeWidth: AppLayoutSizeWidth;
  announceMessage: string;
  usingNewRelease: boolean;
  openOverlays: number; //count of all overlays/modals/bottomsheets/contextMenus currently open
  navigationDisabled: boolean;
  routeLoading: boolean;
  homePageShown: boolean;
}
