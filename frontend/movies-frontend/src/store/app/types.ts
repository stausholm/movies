export type AppLayoutSizeWidth = 'mobile' | 'tablet' | 'desktop';

export interface AppState {
  layoutSizeWidth: AppLayoutSizeWidth;
  announceMessage: string;
  usingNewRelease: boolean;
}
